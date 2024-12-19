import { ChargementQuizzPresenter } from '@/domaines/quiz/ports/chargementQuizz.presenter';
import { QuizRepository } from '@/domaines/quiz/ports/quizRepository';

export class PrevisualiserQuizUsecase {
  constructor(private readonly quizRepository: QuizRepository) {}

  async execute(quizId: string, chargementQuizPresenter: ChargementQuizzPresenter) {
    const quiz = await this.quizRepository.getPrevisualisationQuiz(quizId);
    chargementQuizPresenter.presenteQuiz(quiz);
  }
}
