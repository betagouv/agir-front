import { ChargementDashboardPresenter, DashboardViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";
import { Dashboard } from "@/dashboard/ports/dashboardRepository.ts";

export class ChargementDashboardPresenterImpl implements ChargementDashboardPresenter {
  get dashboardViewModel(): DashboardViewModel {
    return this._dashboardViewModel;
  }
  private _dashboardViewModel: DashboardViewModel = {
    utilisateur: "",
    consommation: "",
    tendancePicto: "",
    texte: "",
  };
  presenteDashboard(utilisateur: string, dashboard: Dashboard): void {
    this._dashboardViewModel = {
      utilisateur,
      consommation: dashboard.consommation.toFixed(1),
      tendancePicto: dashboard.consommation > 50 ? "trend-icon--up" : "trend-icon--down",
      texte: dashboard.consommation > 50 ? "Consommation en hausse" : "Consommation en baisse",
    };
  }
}
