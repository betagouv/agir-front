import { QuizRepositoryEvaluerAvecDesBonnesReponses } from "./quizRepositoryEvaluerAvecDesBonnesReponses";
import { EvaluerQuizUsecase } from "../../src/quiz/evaluerQuiz.usecase";
import { EvaluerQuizPresenterImpl, EvaluerQuizViewModel } from "../../src/quiz/adapters/evaluerQuiz.presenter.impl";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";
import { Interaction } from "../../src/interactions/chargerInteractions.usecase";

class SpyInteractionTermineRepositoryForTest implements InteractionsRepository {
  get aEteAppelee(): boolean {
    return this._aEteAppelee;
  }

  private _aEteAppelee: boolean = false;

  constructor() {}

  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    throw Error();
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {}

  interactionAEteTerminee(interactionId: string, utilisateurId: string): void {
    this._aEteAppelee = true;
  }
}

describe("Fichier de tests unitaire pour la correction des quiz", () => {
  it("En donnant une tableau de réponses doit et dans le cas de bonnes réponses doit me renvoyer un succes", async () => {
    // GIVEN
    const spyInteractionTermineRepositoryForTest = new SpyInteractionTermineRepositoryForTest();
    // WHEN
    const useCase = new EvaluerQuizUsecase(new QuizRepositoryEvaluerAvecDesBonnesReponses(), spyInteractionTermineRepositoryForTest);
    const quizzId = "1";
    const reponses: Map<string, string> = new Map();
    reponses.set("1", "300m");
    reponses.set("2", "2700L");
    await useCase.execute("interactionId", "utilisateur", quizzId, reponses, new EvaluerQuizPresenterImpl(expectation));

    // THEN
    function expectation(evaluerQuizzViewModel: EvaluerQuizViewModel) {
      expect(evaluerQuizzViewModel).toStrictEqual({ quizGagne: true });
    }
  });

  it("Lorsque l'on évalue un quiz on doit prévenir le back office que celui ci est terminé", async () => {
    // GIVEN
    const spyInteractionTermineRepositoryForTest = new SpyInteractionTermineRepositoryForTest();
    // WHEN
    const useCase = new EvaluerQuizUsecase(new QuizRepositoryEvaluerAvecDesBonnesReponses(), spyInteractionTermineRepositoryForTest);
    const quizzId = "1";
    const reponses: Map<string, string> = new Map();
    reponses.set("1", "300m");
    reponses.set("2", "2700L");
    await useCase.execute("interactionId", "utilisateur", quizzId, reponses, new EvaluerQuizPresenterImpl(() => {}));
    // THEN
    expect(spyInteractionTermineRepositoryForTest.aEteAppelee).toBeTruthy();
  });
});
