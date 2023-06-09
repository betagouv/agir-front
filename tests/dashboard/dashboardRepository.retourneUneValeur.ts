import { Dashboard, DashboardRepository } from "../../src/dashboard/ports/dashboardRepository";

export class DashboardRepositoryRetourneUneValeur implements DashboardRepository {
  private valeur: number = 0;
  constructor(valeur: number) {
    this.valeur = valeur;
  }

  async getDashboard(utilisateur: string): Promise<Dashboard> {
    console.log(utilisateur);
    return {
      consommation: this.valeur,
    };
  }
}
