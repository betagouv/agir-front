import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(private interactionRepository: InteractionsRepository) { }

  async execute(utilisateurId: string, interactionId: string, nombreDeBonnesReponses: number, nombreDeQuestions: number) {
    const pourcentageDeReussite = nombreDeBonnesReponses / nombreDeQuestions * 100;

    return await this.interactionRepository.interactionAvecDonneesAEteTerminee(utilisateurId, interactionId, { quizz_score: pourcentageDeReussite });
  }
}
