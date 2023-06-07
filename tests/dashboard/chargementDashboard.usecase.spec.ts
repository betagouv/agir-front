import { ChargementDashboardUsecase } from "../../src/dashboard/chargementDashboard.usecase";
import { DashboardPresenterSpy } from "./dashboard.presenter.spy";

describe("Fichier de test du usecase de chargement du dashboard", () => {
  it("en donnant un utilisateur valide doit me retourner de la data", () => {
    // GIVEN
    const chargementDashBoardUsecase = new ChargementDashboardUsecase();
    const presenter = new DashboardPresenterSpy();
    // WHEN
    chargementDashBoardUsecase.execute("dlamande", presenter);
    // THEN
    expect(presenter.consommationActuelle).toBe(10);
    expect(presenter.utilisateur).toBe("dlamande");
  });
});
