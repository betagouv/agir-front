import { AxiosFactory, intercept401 } from '@/axios.factory';
import { ServiceRechercheRecettesRepository } from '@/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.repository';
import { Recette } from '@/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';
import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';

interface ServiceRechercheRecettesCategorieApiModel {
  code: string;
  label: string;
  is_default: boolean;
}

interface ServiceRechercheRecettesApiResultatsModel {
  resultats: ServiceRechercheRecettesApiModel[];
  encore_plus_resultats_dispo: boolean;
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

export interface RecetteApiModel {
  id: string;
  image_url: string;
  temps_prepa_min: number;
  titre: string;
  type_plat: string;
  ingredients: {
    nom: string;
    quantite: string;
    unite: string;
  }[];
  etapes_recette: {
    ordre: number;
    texte: string;
  }[];
  difficulty_plat: string;
}

export class ServiceRechercheRecettesAxios implements ServiceRechercheRecettesRepository {
  @intercept401()
  async recupererService(
    idUtilisateur: string,
    type: string,
    nombreMaxResultats: number,
  ): Promise<ServiceRechercheRecettes> {
    const idService = 'recettes';
    const axiosInstance = AxiosFactory.getAxios();

    const responseCategorie = await axiosInstance.get<ServiceRechercheRecettesCategorieApiModel[]>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/categories`,
    );

    const response = await axiosInstance.post<ServiceRechercheRecettesApiResultatsModel>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/search2`,
      {
        categorie: type,
        nombre_max_resultats: nombreMaxResultats,
        rayon_metres: 5000,
      },
    );

    return {
      plusDeResultatsDisponibles: response.data.encore_plus_resultats_dispo,
      nombreMaxResultats: nombreMaxResultats,
      suggestions: response.data.resultats
        .filter(suggestion => !suggestion.est_favoris)
        .map(suggestion => ({
          id: suggestion.id,
          titre: suggestion.titre,
          difficulte: suggestion.difficulty_plat,
          nombreFavoris: suggestion.nombre_favoris,
          tempsDePreparation: suggestion.temps_prepa_min,
          typeDePlat: suggestion.type_plat,
          img: suggestion.image_url,
        })),
      favoris: response.data.resultats
        .filter(suggestion => suggestion.est_favoris)
        .map(suggestion => ({
          id: suggestion.id,
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

  @intercept401()
  async recupererDetailRecette(idUtilisateur: string, idRecette: string): Promise<Recette> {
    const idService = 'recettes';
    const axiosInstance = AxiosFactory.getAxios();

    const reponse = await axiosInstance.get<RecetteApiModel>(
      `/utilisateurs/${idUtilisateur}/recherche_services/${idService}/last_results/${idRecette}`,
    );

    return {
      titre: reponse.data.titre,
      tempsDePreparation: reponse.data.temps_prepa_min,
      image: reponse.data.image_url,
      ingredients: reponse.data.ingredients.map(ingredient => ({
        nom: ingredient.nom,
        quantite: ingredient.quantite,
        unite: ingredient.unite,
      })),
      etapes: reponse.data.etapes_recette.map(etape => etape.texte),
      difficulte: reponse.data.difficulty_plat,
    };
  }
}
