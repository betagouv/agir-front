import { ChargementScoreUsecase } from "../../src/score/chargementScoreUsecase";
import { ChargementScorePresenterImpl } from "../../src/score/adapters/chargementScorePresenterImpl";
import { ScoreViewModel } from "../../src/score/ports/chargementScorePresenter";
import { ScoreRepositoryRetourneUneValeur } from "./dashboardRepository.retourneUneValeur";

describe("Fichier de test du usecase de chargement du dashboard", () => {
  it("en donnant un utilisateur valide doit me retourner de la data", async () => {
    // GIVEN
    const chargementScoreUsecase = new ChargementScoreUsecase(new ScoreRepositoryRetourneUneValeur(10));
    // WHEN
    await chargementScoreUsecase.execute("dlamande", new ChargementScorePresenterImpl(expectation));
    // THEN
    function expectation(viewModel: ScoreViewModel) {
      expect(viewModel).toStrictEqual<ScoreViewModel>({
        utilisateur: "dlamande",
        badges: [
          {
            titre: "mon super badge",
            date: "Obtenu le 20/6/2023",
          },
        ],
        score: 10,
      });
    }
  });
});
