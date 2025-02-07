import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Action, ActionsRepository } from '@/domaines/actions/ports/actions.repository';

interface ActionApiModel {
  titre: string;
  sous_titre: string;
  comment: string;
  pourquoi: string;
}

export class ActionsRepositoryAxios implements ActionsRepository {
  @intercept401()
  async chargerAction(idUtilisateur: string, idAction: string): Promise<Action> {
    const axios = AxiosFactory.getAxios();
    const response = await axios.get<ActionApiModel>(`/actions/${idAction}`);
    return {
      titre: response.data.titre,
      sousTitre: response.data.sous_titre,
      corps: {
        introduction: response.data.comment,
        astuces: response.data.pourquoi,
      },
      recommandations: [],
    };
  }
}
