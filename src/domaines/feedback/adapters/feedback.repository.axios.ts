import { AxiosFactory, intercept401 } from '@/axios.factory';
import { AideFeedback } from '@/domaines/feedback/envoyerFeedbackAide.usecase';
import { FeedbackRepository } from '@/domaines/feedback/ports/feedback.repository';

type AideFeedBackPostApiModel = {
  like_level: number;
  feedback: string;
  est_connue_utilisateur: boolean;
  sera_sollicitee_utilisateur: boolean;
};

export class FeedbackRepositoryAxios implements FeedbackRepository {
  @intercept401()
  async envoyerFeedbackAide(idUtilisateur: string, idAide: string, aideFeedback: AideFeedback): Promise<void> {
    const axios = AxiosFactory.getAxios();
    const feedback: AideFeedBackPostApiModel = {
      like_level: aideFeedback.note,
      est_connue_utilisateur: aideFeedback.estConnue,
      sera_sollicitee_utilisateur: aideFeedback.seraSollicite,
      feedback: aideFeedback.commentaire ?? '',
    };
    await axios.post(`/utilisateurs/${idUtilisateur}/aides/${idAide}/feedback`, feedback);
  }
}
