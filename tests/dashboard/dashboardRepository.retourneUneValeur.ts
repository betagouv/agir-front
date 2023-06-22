import { Dashboard, DashboardRepository } from "../../src/dashboard/ports/dashboardRepository";

export class DashboardRepositoryRetourneUneValeur implements DashboardRepository {
  private valeur: number = 0;
  constructor(valeur: number) {
    this.valeur = valeur;
  }

  async getDashboard(utilisateur: string): Promise<Dashboard> {
    return {
      compteurs: [
        {
          titre: "mon compteur",
          valeur: this.valeur,
        },
      ],
      quizz: [
        {
          id: 1,
          titre: "mon super quizz",
        },
      ],
      badges: [
        {
          titre: "mon super badge",
          date: "2023-06-20T13:16:15.408Z",
        },
      ],
      empreinte: {
        bilan: "7932.9",
      },
    };
  }
}
