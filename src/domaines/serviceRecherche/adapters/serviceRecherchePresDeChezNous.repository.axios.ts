import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

interface ServiceRechercheApiModel {
  id: string;
  titre: string;
  adresse_code_postal?: string;
  adresse_nom_ville?: string;
  adresse_rue?: string;
  site_web?: string;
  nombre_favoris: number;
  distance_metres: number;
  image_url: string;
}

export interface ServiceRechercheCategorieApiModel {
  code: string;
  label: string;
  is_default: boolean;
}

export class ServiceRecherchePresDeChezNousAxios implements ServiceRecherchePresDeChezNousRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, categorie: string): Promise<ServiceRecherchePresDeChezNous> {
    const idService = 'proximite';
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const responseSuggestionsPromise = axiosInstance.post<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie,
        nombre_max_resultats: 0,
        rayon_metres: 5000,
      },
    );

    const responseFavorisPromise = axiosInstance.get<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/favoris`,
    );

    const [responseSuggestions, responseFavoris] = await Promise.all([
      responseSuggestionsPromise,
      responseFavorisPromise,
    ]);

    const mapServiceRecherche = (elem: ServiceRechercheApiModel) => {
      let adresseFinale: string | undefined;
      const adresse_rue = elem.adresse_rue ? elem.adresse_rue + ', ' : '';
      const adresse_nom_ville = elem.adresse_nom_ville ? elem.adresse_nom_ville + ' - ' : '';
      const adresse_code_postal = elem.adresse_code_postal ? elem.adresse_code_postal : '';

      if (!adresse_rue && !adresse_nom_ville && !adresse_code_postal) {
        adresseFinale = `${adresse_rue} ${adresse_nom_ville} ${adresse_code_postal}`;
      }

      return {
        titre: elem.titre,
        adresse: adresseFinale,
        nombreMiseEnFavoris: elem.nombre_favoris,
        distance: elem.distance_metres,
        image: elem.image_url,
      };
    };

    return {
      titre: 'Mon titre',
      suggestions: responseSuggestions.data.map(mapServiceRecherche),
      favoris: responseFavoris.data.map(mapServiceRecherche),
      categories: responseCategorie.data.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.is_default,
      })),
    };
  }
}
