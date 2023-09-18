import { AxiosFactory } from "@/axios.factory";
import { Score, ScoreRepository } from "@/score/ports/scoreRepository";

interface BadgeApiModel {
  titre: string;
  date: "14/06/2023";
}

interface ScoreApiModel {
  points: number;
  badges: BadgeApiModel[];
}
export class ScoreRepositoryAxios implements ScoreRepository {
  async getScore(idUtilisateur: string): Promise<Score> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<ScoreApiModel>(`/utilisateurs/${idUtilisateur}`);
      return {
        badges: response.data.badges,
        score: response.data.points,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
