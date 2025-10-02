import { QuizRepository } from '@/domaines/quiz/ports/quiz.repository';

export class EnvoyerDonneesQuizInteractionUsecase {
  constructor(private quizRepository: QuizRepository) {}

  async execute(utilisateurId: string, quizId: string, pourcentageDeReussite: 0 | 100) {
    await this.quizRepository.terminerQuiz(utilisateurId, quizId, pourcentageDeReussite);
  }
}
