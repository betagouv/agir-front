import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionFeedback } from '@/domaines/feedback/envoyerFeedbackAction.usecase';
import { AideFeedback } from '@/domaines/feedback/envoyerFeedbackAide.usecase';

export interface FeedbackRepository {
  envoyerFeedbackAide(idUtilisateur: string, idAide: string, aideFeedback: AideFeedback): Promise<void>;

  envoyerFeedbackAction(
    idUtilisateur: string,
    idAction: string,
    typeAction: TypeAction,
    actionFeedback: ActionFeedback,
  ): Promise<void>;
}
