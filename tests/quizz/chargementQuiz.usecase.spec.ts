import { Quiz, QuizRepository } from "../../src/quiz/ports/quizRepository";
import { ChargementQuizUsecase } from "../../src/quiz/chargementQuiz.usecase";
import { ChargementQuizPresenterImpl, QuizViewModel } from "../../src/quiz/adapters/chargementQuiz.presenter.impl";

class QuizRepositoryForTest implements QuizRepository {
  async getQuiz(id: string): Promise<Quiz> {
    return {
      titre: `Mon super quizz ${id}`,
      questions: [
        {
          id: "1",
          ordre: "1",
          intitule: "Une question ?",
          reponsesPossibles: ["Reponse 1", "Reponse 2"],
          texteExplicationOK: "Un texte d'explication OK",
          texteExplicationKO: "Un texte d'explication KO",
          solution: "Reponse 1",
        },
      ],
    };
  }

  evaluerQuiz(utilisateur: string, quizId: string, reponses: Map<string, string>): Promise<boolean> {
    console.log(utilisateur, quizId, reponses);
    throw Error;
  }
}

describe("Fichier de test du usecase de chargement d'un quizz", () => {
  it("En donnant un id de quizz, doit me retourne le quizz", () => {
    // GIVEN
    const chargementQuizzUsecase = new ChargementQuizUsecase(new QuizRepositoryForTest());

    // WHEN
    chargementQuizzUsecase.execute("1", new ChargementQuizPresenterImpl(expectation));

    // THEN
    function expectation(quizzViewModel: QuizViewModel) {
      expect(quizzViewModel).toStrictEqual<QuizViewModel>({
        titre: "Mon super quizz 1",
        questions: [
          {
            id: "1",
            ordre: "1",
            intitule: "Une question ?",
            reponsesPossibles: ["Reponse 1", "Reponse 2"],
            texteExplicationKO: "Un texte d'explication KO",
            texteExplicationOK: "Un texte d'explication OK",
            solution: "Reponse 1",
          },
        ],
        steps: "2",
      });
    }
  });
});
