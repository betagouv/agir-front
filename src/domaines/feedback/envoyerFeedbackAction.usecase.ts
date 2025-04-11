import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { FeedbackRepository } from '@/domaines/feedback/ports/feedback.repository';

export interface ActionFeedback {
  note: number;
  commentaire?: string;
}

export class EnvoyerFeedbackActionUsecase {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  async execute(
    utilisateurId: string,
    actionId: string,
    typeAction: TypeAction,
    actionFeedback: ActionFeedback,
  ): Promise<void> {
    await this.feedbackRepository.envoyerFeedbackAction(utilisateurId, actionId, typeAction, actionFeedback);
  }
}
