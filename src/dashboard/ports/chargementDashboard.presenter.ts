import { Dashboard } from "@/dashboard/ports/dashboardRepository";

export interface CompteurViewModel {
  consommation: string;
  tendancePicto: string;
  texte: string;
  titre: string;
}

export interface QuizzViewModel {
  id: number;
  titre: string;
}

export interface BadgeViewModel {
  titre: string;
  date: string;
}
export interface DashboardViewModel {
  utilisateur: string;
  compteur: CompteurViewModel;
  quizz: QuizzViewModel[];
  badges: BadgeViewModel[];
}
export interface ChargementDashboardPresenter {
  presenteDashboard(utilisateur: string, dashboard: Dashboard): void;
}
