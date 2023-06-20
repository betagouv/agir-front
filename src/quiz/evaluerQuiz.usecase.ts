import { EvaluerQuizPresenter } from "@/quiz/ports/evaluerQuizPresenter";
import { QuizRepository } from "@/quiz/ports/quizRepository";

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
