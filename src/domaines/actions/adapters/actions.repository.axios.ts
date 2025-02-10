import { AxiosFactory } from '@/axios.factory';
import { Action, ActionsRepository } from '@/domaines/actions/ports/actions.repository';

interface ActionApiModel {
  code: string;
  titre: string;
  sous_titre: string;
  comment: string;
  pourquoi: string;
  nombre_actions_en_cours: number;
  nombre_aides_disponibles: number;
}

export class ActionsRepositoryAxios implements ActionsRepository {
  async chargerAction(idUtilisateur: string, idAction: string): Promise<Action> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionApiModel>(`/actions/${idAction}`);
    return {
      code: response.data.code,
      titre: response.data.titre,
      sousTitre: response.data.sous_titre,
      corps: {
        introduction: response.data.pourquoi,
        astuces: response.data.comment,
      },
      recommandations: [],
      nombreDePersonnes: response.data.nombre_actions_en_cours,
      nombreAideDispobible: response.data.nombre_aides_disponibles,
    };
  }

  async recupererToutesLesActions(): Promise<Action[]> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionApiModel[]>(`/actions`);
    return response.data.map(action => ({
      code: action.code,
      titre: action.titre,
      sousTitre: action.sous_titre,
      corps: {
        introduction: action.comment,
        astuces: action.pourquoi,
      },
      recommandations: [],
      nombreDePersonnes: action.nombre_actions_en_cours,
      nombreAideDispobible: action.nombre_aides_disponibles,
    }));
  }
}
