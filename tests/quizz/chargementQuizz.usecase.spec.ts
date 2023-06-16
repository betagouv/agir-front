import {ChargementQuizzUsecase} from "../../src/quizz/chargementQuizz.usecase";
import {Quizz, QuizzRepository} from "../../src/quizz/ports/quizzRepository";
import {ChargementQuizzPresenterImpl, QuizzViewModel} from "../../src/quizz/adapters/chargementQuizz.presenter.impl";

class QuizzRepositoryForTest implements QuizzRepository {
  async getQuizz(id: number): Promise<Quizz> {
    return {
      titre: `Mon super quizz ${id}`,
      questions: [{
        id: 1,
        intitule: "Une question ?",
        reponsesPossibles: ["Reponse 1", "Reponse 2"]
      }],
    };
  }
}

describe("Fichier de test du usecase de chargement d'un quizz", () => {
  it("En donnant un id de quizz, doit me retourne le quizz", () => {
    // GIVEN
    const chargementQuizzUsecase = new ChargementQuizzUsecase(new QuizzRepositoryForTest());

    // WHEN
    chargementQuizzUsecase.execute(1, new ChargementQuizzPresenterImpl(expectation));

    // THEN
    function expectation(quizzViewModel: QuizzViewModel) {
      expect(quizzViewModel).toStrictEqual<QuizzViewModel>({
        titre: "Mon super quizz 1",
        questions: [
          {
            id: 1,
            intitule: "Une question ?",
            reponsesPossibles: ["Reponse 1", "Reponse 2"],
          },
        ],
      });
    }
  });
});
