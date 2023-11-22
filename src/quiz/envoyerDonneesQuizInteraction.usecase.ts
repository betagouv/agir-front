import { QuizRepository } from '@/quiz/ports/quizRepository';

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(private quizRepository: QuizRepository) {}

  async execute(
    utilisateurId: string,
    interactionId: string,
    nombreDeBonnesReponses: number,
    nombreDeQuestions: number
  ) {
    const pourcentageDeReussite = (nombreDeBonnesReponses / nombreDeQuestions) * 100;

    await this.quizRepository.terminerQuiz(utilisateurId, interactionId, pourcentageDeReussite);
  }
}
