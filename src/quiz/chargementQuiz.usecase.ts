import { ChargementQuizzPresenter } from '@/quiz/ports/chargementQuizz.presenter';
import { QuizRepository } from '@/quiz/ports/quizRepository';

export class ChargementQuizUsecase {
  private _quizzRepository: QuizRepository;

  constructor(quizRepository: QuizRepository) {
    this._quizzRepository = quizRepository;
  }

  async execute(quizId: string, chargementQuizPresenter: ChargementQuizzPresenter) {
    const quiz = await this._quizzRepository.getQuiz(quizId);
    chargementQuizPresenter.presenteQuiz(quiz);
  }
}
