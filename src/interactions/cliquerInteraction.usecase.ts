import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";

export class CliquerInteractionUsecase {
  private _interactionRepository: InteractionsRepository;
  constructor(interactionRepository: InteractionsRepository) {
    this._interactionRepository = interactionRepository;
  }

  execute(utilisateurId: string, interactionId: string) {
    this._interactionRepository.interactionAEteCliquee(interactionId, utilisateurId);
  }
}
