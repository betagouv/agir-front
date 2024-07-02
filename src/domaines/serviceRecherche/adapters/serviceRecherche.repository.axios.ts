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
  isDefault: boolean;
}

export class ServiceRechercheAxios implements ServiceRechercheRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherche> {
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const responseSuggestions = await axiosInstance.post<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie: responseCategorie.data[0].code,
        nombre_max_resultats: 0,
        rayon_metres: 5000,
      },
    );

    const responseFavoris = await axiosInstance.get<ServiceRechercheApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/favoris`,
    );

    return {
      titre: 'Mon titre',
      suggestions: responseSuggestions.data.map(elem => ({
        titre: elem.titre,
        adresse: `${elem.adresse_rue}, ${elem.adresse_nom_ville} - ${elem.adresse_code_postal}`,
        nombreMiseEnFavoris: elem.nombre_favoris,
      })),
      favoris: responseFavoris.data.map(elem => ({
        titre: elem.titre,
        adresse: `${elem.adresse_rue}, ${elem.adresse_nom_ville} - ${elem.adresse_code_postal}`,
        nombreMiseEnFavoris: elem.nombre_favoris,
      })),
      categories: responseCategorie.data.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.isDefault,
      })),
    };
  }
}
