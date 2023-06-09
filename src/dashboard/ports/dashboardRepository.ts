export interface Dashboard {
  consommation: number;
}
export interface DashboardRepository {
  getDashboard(utilisateur: string): Promise<Dashboard>;
}
