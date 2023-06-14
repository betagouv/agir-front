import { Dashboard, DashboardRepository } from "../../src/dashboard/ports/dashboardRepository";

export class DashboardRepositoryRetourneUneValeur implements DashboardRepository {
  private valeur: number = 0;
  constructor(valeur: number) {
    this.valeur = valeur;
  }

  async getDashboard(utilisateur: string): Promise<Dashboard> {
    console.log(utilisateur);
    return {
      compteur: {
        titre: "mon compteur",
        valeur: this.valeur,
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
    };
  }
}
