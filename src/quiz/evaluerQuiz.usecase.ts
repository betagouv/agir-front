import { EvaluerQuizPresenter } from "@/quiz/ports/evaluerQuizPresenter";
import { QuizRepository } from "@/quiz/ports/quizRepository";

export class EvaluerQuizUsecase {
  private _quizzRepository: QuizRepository;
  constructor(quizzRepository: QuizRepository) {
    this._quizzRepository = quizzRepository;
  }

  async execute(utilisateurId: string, quizzId: string, reponses: Map<string, string>, presenter: EvaluerQuizPresenter) {
    const resultat = await this._quizzRepository.evaluerQuiz(utilisateurId, quizzId, reponses);
    presenter.presente(resultat);
  }
}
