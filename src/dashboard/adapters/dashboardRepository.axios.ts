import axios from "axios";
import { Dashboard, DashboardRepository } from "@/dashboard/ports/dashboardRepository.ts";

export class DashboardRepositoryAxios implements DashboardRepository {
  async getDashboard(utilisateur: string): Promise<Dashboard> {
    try {
      const dashboardApiReponse = await axios.get("https://agir-back-dev.osc-fr1.scalingo.io/");
      console.log(utilisateur);
      console.log(dashboardApiReponse);
    } catch (e) {
      console.log(e);
    }
    return { consommation: 10 };
  }
}
