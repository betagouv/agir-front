import { AxiosFactory } from '@/axios.factory';
import { Action, ActionDetail, ActionsRepository, TypeAction } from '@/domaines/actions/ports/actions.repository';

interface ActionApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  nom_commune: string;
  comment: string;
  pourquoi: string;
  nombre_actions_en_cours: number;
  nombre_aides_disponibles: number;
  services: {
    categorie: string;
    recherche_service_id: string;
  }[];
  type: string;
}

interface ActionDetailApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  type: 'classique' | 'quizz' | 'kyc';
  nom_commune: string;
  comment: string;
  pourquoi: string;
  nombre_actions_en_cours: number;
  nombre_aides_disponibles: number;
  services: {
    categorie: string;
    recherche_service_id: string;
  }[];
}

export class ActionsRepositoryAxios implements ActionsRepository {
  async chargerAction(idUtilisateur: string, idAction: string, typeAction: TypeAction): Promise<ActionDetail> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionDetailApiModel>(
      `/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}`,
    );
    return {
      code: response.data.code,
      titre: response.data.titre,
      sousTitre: response.data.sous_titre,
      type: response.data.type,
      commune: response.data.nom_commune,
      corps: {
        introduction: response.data.pourquoi,
        astuces: response.data.comment,
      },
      recommandations: [],
      nombreDePersonnes: response.data.nombre_actions_en_cours,
      nombreAidesDisponibles: response.data.nombre_aides_disponibles,
      services: response.data.services.map(service => ({
        type: service.recherche_service_id as 'recettes' | 'longue_vie_objets' | 'pres_de_chez_nous',
        parametreDuService: service.categorie,
      })),
    };
  }

  async recupererToutesLesActions(idUtilisateur: string): Promise<Action[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionApiModel[]>(`/utilisateurs/${idUtilisateur}/actions`);
    return response.data.map(action => ({
      code: action.code,
      titre: action.titre,
      sousTitre: action.sous_titre,
      nombreDePersonnes: action.nombre_actions_en_cours,
      nombreAidesDisponibles: action.nombre_aides_disponibles,
      type: action.type as TypeAction,
    }));
  }
}
