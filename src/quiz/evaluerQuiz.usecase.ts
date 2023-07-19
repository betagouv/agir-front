import { EvaluerQuizPresenter } from "@/quiz/ports/evaluerQuizPresenter";
import { QuizRepository } from "@/quiz/ports/quizRepository";
import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";

export class EvaluerQuizUsecase {
  private _quizzRepository: QuizRepository;
  private _interactionRepository: InteractionsRepository;
  constructor(quizzRepository: QuizRepository, interactionRepository: InteractionsRepository) {
    this._quizzRepository = quizzRepository;
    this._interactionRepository = interactionRepository;
  }

  async execute(interactionId: string, utilisateurId: string, quizzId: string, reponses: Map<string, string>, presenter: EvaluerQuizPresenter) {
    this._interactionRepository.interactionAEteTerminee(interactionId, utilisateurId);
    const resultat = await this._quizzRepository.evaluerQuiz(utilisateurId, quizzId, reponses);
    presenter.presente(resultat);
  }
}
