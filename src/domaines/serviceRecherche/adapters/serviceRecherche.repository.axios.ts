import { ServiceRechercheRepository } from '../ports/serviceRecherche.repository';
import { ServiceRecherche } from '../recupererServiceRecherche.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface ServiceRechercheApiModel {
  id: string;
  titre: string;
  adresse_code_postal?: string;
  adresse_nom_ville?: string;
  adresse_rue?: string;
  site_web?: string;
  nombre_favoris: number;
}

interface ServiceRechercheCategorieApiModel {
  code: string;
  label: string;
  is_default: boolean;
}

export class ServiceRechercheAxios implements ServiceRechercheRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherche> {
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const defaultCategorie = responseCategorie.data.find(elem => elem.is_default)?.code;

    // Récupération des suggestions et favoris en parallèle
    const responseSuggestionsPromise = axiosInstance.post<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie: defaultCategorie,
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

    const mapServiceRecherche = (elem: ServiceRechercheApiModel) => ({
      titre: elem.titre,
      adresse: `${elem.adresse_rue}, ${elem.adresse_nom_ville} - ${elem.adresse_code_postal}`,
      nombreMiseEnFavoris: elem.nombre_favoris,
    });

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
