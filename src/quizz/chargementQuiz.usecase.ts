import { QuizRepository } from "@/quizz/ports/quizRepository.ts";
import { ChargementQuizPresenterImpl } from "@/quizz/adapters/chargementQuiz.presenter.impl.ts";

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
