import { InteractionsRepository } from '@/interactions/ports/interactionsRepository';

export class CliquerInteractionUsecase {
  private _interactionRepository: InteractionsRepository;
  constructor(interactionRepository: InteractionsRepository) {
    this._interactionRepository = interactionRepository;
  }

  async execute(utilisateurId: string, interactionId: string, interactionType: string): Promise<void> {
    if (interactionType === 'ARTICLE') {
      await this._interactionRepository.interactionAEteTerminee(interactionId, utilisateurId);
    }
    await this._interactionRepository.interactionAEteCliquee(interactionId, utilisateurId);
  }
}
