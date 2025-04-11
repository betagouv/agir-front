import { FeedbackRepository } from '@/domaines/feedback/ports/feedback.repository';

export interface AideFeedback {
  note: number;
  estConnue: boolean;
  seraSollicite: boolean;
  commentaire?: string;
}

export class EnvoyerFeedbackAideUsecase {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async execute(utilisateurId: string, aideId: string, aideFeedback: AideFeedback): Promise<void> {
    await this.feedbackRepository.envoyerFeedbackAide(utilisateurId, aideId, aideFeedback);
  }
}
