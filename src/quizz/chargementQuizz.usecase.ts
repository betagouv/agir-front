import { QuizzRepository } from "@/quizz/ports/quizzRepository.ts";
import { ChargementQuizzPresenterImpl } from "@/quizz/adapters/chargementQuizz.presenter.impl.ts";

export class ChargementQuizzUsecase {
  private _quizzRepository: QuizzRepository;

  constructor(quizzRepository: QuizzRepository) {
    this._quizzRepository = quizzRepository;
  }

  async execute(quizzId: number, chargementQuizzPresenterImpl: ChargementQuizzPresenterImpl) {
    const quizz = await this._quizzRepository.getQuizz(quizzId);
    chargementQuizzPresenterImpl.presenteQuizz(quizz);
  }
}
