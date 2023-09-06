import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(private interactionRepository: InteractionsRepository) { }

  async execute(utilisateurId: string, interactionId: string, score: number) {
    await this.interactionRepository.interactionAvecDonneesAEteTerminee(utilisateurId, interactionId, { quizz_score: score });
  }
}
