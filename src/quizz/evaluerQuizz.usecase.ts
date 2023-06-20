import { EvaluerQuizzPresenter } from "@/quizz/ports/evaluerQuizz.presenter.ts";
import { QuizzRepository } from "@/quizz/ports/quizzRepository.ts";

export class EvaluerQuizzUsecase {
  private _quizzRepository: QuizzRepository;
  constructor(quizzRepository: QuizzRepository) {
    this._quizzRepository = quizzRepository;
  }

  async execute(utilisateur: string, quizzId: number, reponses: Map<string, string>, presenter: EvaluerQuizzPresenter) {
    await this._quizzRepository.evaluerQuizz(utilisateur, quizzId, reponses);
    presenter.presente(true);
  }
}
