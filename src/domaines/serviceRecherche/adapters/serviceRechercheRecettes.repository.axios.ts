import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRechercheRecettesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheRecettes.repository';
import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recupererServiceRecettes.usecase';

interface ServiceRechercheRecettesCategorieApiModel {
  code: string;
  label: string;
  is_default: boolean;
}

interface ServiceRechercheRecettesApiModel {
  id: string;
  difficulty_plat: string;
  est_favoris: boolean;
  image_url: string;
  nombre_favoris: number;
  temps_prepa_min: number;
  titre: string;
  type_plat: string;
}

export class ServiceRechercheRecettesAxios implements ServiceRechercheRecettesRepository {
  @intercept401()
  async recupererService(idUtilisateur: string, type: string): Promise<ServiceRechercheRecettes> {
    const idService = 'recettes';
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheRecettesCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const response = await axiosInstance.post<ServiceRechercheRecettesApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search`,
      {
        categorie: type,
        nombre_max_resultats: 0,
        rayon_metres: 5000,
      },
    );

    return {
      suggestions: response.data
        .filter(suggestion => !suggestion.est_favoris)
        .map(suggestion => ({
          titre: suggestion.titre,
          difficulte: suggestion.difficulty_plat,
          nombreFavoris: suggestion.nombre_favoris,
          tempsDePreparation: suggestion.temps_prepa_min,
          typeDePlat: suggestion.type_plat,
          img: suggestion.image_url,
        })),
      favoris: response.data
        .filter(suggestion => suggestion.est_favoris)
        .map(suggestion => ({
          titre: suggestion.titre,
          difficulte: suggestion.difficulty_plat,
          nombreFavoris: suggestion.nombre_favoris,
          tempsDePreparation: suggestion.temps_prepa_min,
          typeDePlat: suggestion.type_plat,
          img: suggestion.image_url,
        })),
      categories: responseCategorie.data.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.is_default,
      })),
    };
  }
}
