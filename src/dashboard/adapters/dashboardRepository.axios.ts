import { Dashboard, DashboardRepository } from "@/dashboard/ports/dashboardRepository.ts";
import { AxiosFactory } from "@/axios.factory.ts";

export class DashboardRepositoryAxios implements DashboardRepository {
  async getDashboard(utilisateur: string): Promise<Dashboard> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get(`/dashboard/${utilisateur}`);
      console.log(utilisateur);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return {
      compteur: {
        titre: "Mon super compteur",
        valeur: 10,
      },
      quizz: [
        {
          id: 1,
          titre: "Mon super quizz",
        },
      ],
      badges: [],
    };
  }
}
