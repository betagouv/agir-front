import { Dashboard, DashboardRepository } from "@/dashboard/ports/dashboardRepository.ts";
import axios from "axios";

export class DashboardRepositoryAxios implements DashboardRepository {
  async getDashboard(utilisateur: string): Dashboard {
    const dashboardApiReponse = await axios.get("https://agir-back-dev.osc-fr1.scalingo.io/");
    console.log(utilisateur);
    console.log(dashboardApiReponse);
    return { consommation: 10 };
  }
}
