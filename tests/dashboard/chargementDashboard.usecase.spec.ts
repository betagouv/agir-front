import { ChargementDashboardUsecase } from "../../src/dashboard/chargementDashboard.usecase";
import { ChargementDashboardPresenterImpl } from "../../src/dashboard/adapters/chargementDashboard.presenter.impl";
import { DashboardRepositoryRetourneUneValeur } from "./dashboardRepository.retourneUneValeur";
import { DashboardViewModel } from "../../src/dashboard/ports/chargementDashboard.presenter";

describe("Fichier de test du usecase de chargement du dashboard", () => {
  it("en donnant un utilisateur valide doit me retourner de la data", async () => {
    // GIVEN
    const chargementDashBoardUsecase = new ChargementDashboardUsecase(new DashboardRepositoryRetourneUneValeur(10));
    // WHEN
    await chargementDashBoardUsecase.execute("dlamande", new ChargementDashboardPresenterImpl(expectation));
    // THEN
    function expectation(viewModel: DashboardViewModel) {
      expect(viewModel).toStrictEqual<DashboardViewModel>({
        utilisateur: "dlamande",
        compteur: {
          tendancePicto: "trend-icon--down",
          texte: "Consommation en baisse",
          consommation: "10.0",
          titre: "mon compteur",
        },
        quizz: [
          {
            id: 1,
            titre: "mon super quizz",
          },
        ],
        badges: [
          {
            titre: "mon super badge",
            date: "14/06/2023",
          },
        ],
      });
    }
  });
});
