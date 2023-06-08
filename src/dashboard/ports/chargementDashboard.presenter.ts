import { Dashboard } from "@/dashboard/ports/dashboardRepository.ts";

export interface DashboardViewModel {
  utilisateur: string;
  consommation: string;
  tendancePicto: string;
  texte: string;
}
export interface ChargementDashboardPresenter {
  presenteDashboard(utilisateur: string, dashboard: Dashboard): void;
}
