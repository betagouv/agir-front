import { ChargementDashboardPresenter, DashboardViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";
import { Dashboard } from "@/dashboard/ports/dashboardRepository.ts";

export class ChargementDashboardPresenterImpl implements ChargementDashboardPresenter {
  constructor(dashboardViewModel: (viewmModel: DashboardViewModel) => void) {
    this._dashboardViewModel = dashboardViewModel;
  }

  private _dashboardViewModel: (viewmModel: DashboardViewModel) => void;
  presenteDashboard(utilisateur: string, dashboard: Dashboard): void {
    this._dashboardViewModel({
      utilisateur,
      compteur: {
        consommation: dashboard.compteur.valeur.toFixed(1),
        tendancePicto: dashboard.compteur.valeur > 50 ? "trend-icon--up" : "trend-icon--down",
        texte: dashboard.compteur.valeur > 50 ? "Consommation en hausse" : "Consommation en baisse",
        titre: dashboard.compteur.titre,
      },
      quizz: dashboard.quizz,
      badges: dashboard.badges,
    });
  }
}
