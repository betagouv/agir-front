import { QuizRepositoryEvaluerAvecDesBonnesReponses } from "./quizRepositoryEvaluerAvecDesBonnesReponses";
import { EvaluerQuizUsecase } from "../../src/quiz/evaluerQuiz.usecase";
import { EvaluerQuizPresenterImpl, EvaluerQuizViewModel } from "../../src/quiz/adapters/evaluerQuiz.presenter.impl";

describe("Fichier de tests unitaire pour la correction des quiz", () => {
  it("En donnant une tableau de réponses doit et dans le cas de bonnes réponses doit me renvoyer un succes", async () => {
    // GIVEN
    // WHEN
    const useCase = new EvaluerQuizUsecase(new QuizRepositoryEvaluerAvecDesBonnesReponses());
    const quizzId = "1";
    const reponses: Map<string, string> = new Map();
    reponses.set("1", "300m");
    reponses.set("2", "2700L");
    await useCase.execute("utilisateur", quizzId, reponses, new EvaluerQuizPresenterImpl(expectation));
    // THEN
    function expectation(evaluerQuizzViewModel: EvaluerQuizViewModel) {
      expect(evaluerQuizzViewModel).toStrictEqual({ quizGagne: true });
    }
  });
});
