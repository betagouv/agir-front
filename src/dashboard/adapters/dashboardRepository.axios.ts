import { Dashboard, DashboardRepository } from "@/dashboard/ports/dashboardRepository.ts";
import { AxiosFactory } from "@/axios.factory.ts";

interface CompteurApiModel {
  titre: string;
  valeur: number;
}
interface QuizzApiModel {
  id: number;
  titre: string;
}

interface BadgeApiModel {
  titre: string;
  date: "14/06/2023";
}
interface DashboardApiModel {
  compteurs: CompteurApiModel[];
  quizz: QuizzApiModel[];
  badges: BadgeApiModel[];
}
export class DashboardRepositoryAxios implements DashboardRepository {
  async getDashboard(utilisateur: string): Promise<Dashboard> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<DashboardApiModel>(`/dashboard/${utilisateur}`);
      return {
        compteurs: response.data.compteurs.map((compteur) => {
          return {
            titre: compteur.titre,
            valeur: compteur.valeur,
          };
        }),
        quizz: response.data.quizz.map((quizz) => {
          return {
            id: quizz.id,
            titre: quizz.titre,
          };
        }),
        badges: response.data.badges,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
