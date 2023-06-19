import { EvaluerQuizPresenter } from "@/quizz/ports/evaluerQuizPresenter.ts";
import { QuizRepository } from "@/quizz/ports/quizRepository.ts";

export class EvaluerQuizUsecase {
  private _quizzRepository: QuizRepository;
  constructor(quizzRepository: QuizRepository) {
    this._quizzRepository = quizzRepository;
  }

  async execute(utilisateur: string, quizzId: number, reponses: Map<string, string>, presenter: EvaluerQuizPresenter) {
    const resultat = await this._quizzRepository.evaluerQuiz(utilisateur, quizzId, reponses);
    presenter.presente(resultat);
  }
}
