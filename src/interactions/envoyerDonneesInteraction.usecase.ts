import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";

export class EnvoyerDonneesInteractionUsecase {
  constructor(private interactionRepository: InteractionsRepository) { }

  async execute(utilisateurId: string, interactionId: string, score: number): Promise<boolean> {
    const quizEnvoye = await this.interactionRepository.interactionAvecDonneesAEteTerminee(utilisateurId, interactionId, score);
    
    return quizEnvoye;
  }
}
