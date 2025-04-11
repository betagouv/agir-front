import { AxiosFactory, intercept401 } from '@/axios.factory';
import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionFeedback } from '@/domaines/feedback/envoyerFeedbackAction.usecase';
import { AideFeedback } from '@/domaines/feedback/envoyerFeedbackAide.usecase';
import { FeedbackRepository } from '@/domaines/feedback/ports/feedback.repository';

type AideFeedbackPostApiModel = {
  like_level: number;
  feedback: string;
  est_connue_utilisateur: boolean;
  sera_sollicitee_utilisateur: boolean;
};

type ActionFeedbackPostApiModel = {
  like_level: number;
  feedback: string;
};

export class FeedbackRepositoryAxios implements FeedbackRepository {
  @intercept401()
  async envoyerFeedbackAide(idUtilisateur: string, idAide: string, aideFeedback: AideFeedback): Promise<void> {
    const axios = AxiosFactory.getAxios();
    const feedback: AideFeedbackPostApiModel = {
      like_level: aideFeedback.note,
      est_connue_utilisateur: aideFeedback.estConnue,
      sera_sollicitee_utilisateur: aideFeedback.seraSollicite,
      feedback: aideFeedback.commentaire ?? '',
    };
    await axios.post(`/utilisateurs/${idUtilisateur}/aides/${idAide}/feedback`, feedback);
  }

  @intercept401()
  async envoyerFeedbackAction(
    idUtilisateur: string,
    idAction: string,
    typeAction: TypeAction,
    actionFeedback: ActionFeedback,
  ): Promise<void> {
    const axios = AxiosFactory.getAxios();
    const feedback: ActionFeedbackPostApiModel = {
      like_level: actionFeedback.note,
      feedback: actionFeedback.commentaire ?? '',
    };
    await axios.post(`/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}/feedback`, feedback);
  }
}
