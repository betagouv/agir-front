import { EvaluerQuizzPresenterImpl, EvaluerQuizzViewModel } from "../../src/quizz/adapters/evaluerQuizz.presenter.impl";
import { QuizzRepositoryEvaluerAvecDesBonnesReponses } from "./quizzRepository.evaluerAvecDesBonnesReponses";
import { EvaluerQuizzUsecase } from "../../src/quizz/evaluerQuizz.usecase";

describe("Fichier de tests unitaire pour la correction des quizz", () => {
  it("En donnant une tableau de réponses doit et dans le cas de bonnes réponses doit me renvoyer un succes", () => {
    // GIVEN
    // WHEN
    const useCase = new EvaluerQuizzUsecase(new QuizzRepositoryEvaluerAvecDesBonnesReponses());
    const quizzId = 1;
    const reponses: Map<string, string> = new Map();
    reponses.set("1", "300m");
    reponses.set("2", "2700L");
    useCase.execute("utilisateur", quizzId, reponses, new EvaluerQuizzPresenterImpl(expectation));
    // THEN
    function expectation(evaluerQuizzViewModel: EvaluerQuizzViewModel) {
      expect(evaluerQuizzViewModel).toStrictEqual({ resultat: "Bravo" });
    }
  });
});
