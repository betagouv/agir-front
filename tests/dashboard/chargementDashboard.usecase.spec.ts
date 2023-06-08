import { ChargementDashboardUsecase } from "../../src/dashboard/chargementDashboard.usecase";
import { ChargementDashboardPresenterImpl } from "../../src/dashboard/adapters/chargementDashboard.presenter.impl";
import { DashboardRepositoryRetourneUneValeur } from "./dashboardRepository.retourneUneValeur";

describe("Fichier de test du usecase de chargement du dashboard", () => {
  it("en donnant un utilisateur valide doit me retourner de la data", async () => {
    // GIVEN
    const chargementDashBoardUsecase = new ChargementDashboardUsecase(new DashboardRepositoryRetourneUneValeur(10));
    const presenter = new ChargementDashboardPresenterImpl();
    // WHEN
    await chargementDashBoardUsecase.execute("dlamande", presenter);
    // THEN
    expect(presenter.dashboardViewModel).toStrictEqual({
      consommation: "10.0",
      tendancePicto: "trend-icon--down",
      texte: "Consommation en baisse",
      utilisateur: "dlamande",
    });
  });
});
