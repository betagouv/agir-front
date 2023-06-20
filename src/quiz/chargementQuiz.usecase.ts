import { QuizRepository } from "@/quiz/ports/quizRepository.ts";
import { ChargementQuizPresenterImpl } from "@/quiz/adapters/chargementQuiz.presenter.impl.ts";

export class ChargementQuizUsecase {
  private _quizzRepository: QuizRepository;

  constructor(quizRepository: QuizRepository) {
    this._quizzRepository = quizRepository;
  }

  async execute(quizId: number, chargementQuizPresenterImpl: ChargementQuizPresenterImpl) {
    const quiz = await this._quizzRepository.getQuiz(quizId);
    chargementQuizPresenterImpl.presenteQuiz(quiz);
  }
}
