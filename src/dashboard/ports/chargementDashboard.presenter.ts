export interface ChargementDashboardPresenter {
  presentDashboard(utilisateur: string, consommationActuelle: number): void;
}
