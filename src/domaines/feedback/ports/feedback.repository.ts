import { AideFeedback } from '@/domaines/feedback/envoyerFeedbackAide.usecase';

export interface FeedbackRepository {
  envoyerFeedbackAide(idUtilisateur: string, idAide: string, aideFeedback: AideFeedback): Promise<void>;
}
