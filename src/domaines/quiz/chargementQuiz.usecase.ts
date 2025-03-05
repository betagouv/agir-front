import { ChargementQuizzPresenter } from '@/domaines/quiz/ports/chargementQuizz.presenter';
import { QuizRepository } from '@/domaines/quiz/ports/quiz.repository';

export class ChargementQuizUsecase {
  private _quizzRepository: QuizRepository;

  constructor(quizRepository: QuizRepository) {
    this._quizzRepository = quizRepository;
  }

  async execute(quizId: string, utilisateurId: string, chargementQuizPresenter: ChargementQuizzPresenter) {
    const quiz = await this._quizzRepository.getQuiz(quizId, utilisateurId);
    chargementQuizPresenter.presenteQuiz(quiz);
  }
}
