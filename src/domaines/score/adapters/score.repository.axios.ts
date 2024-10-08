import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Score, ScoreRepository } from '@/domaines/score/ports/score.repository';

export interface ScoreApiModel {
  points: number;
  niveau: number;
  current_points_in_niveau: number;
  point_target_in_niveau: number;
}

export class ScoreRepositoryAxios implements ScoreRepository {
  @intercept401()
  async getScore(idUtilisateur: string): Promise<Score> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ScoreApiModel>(`/utilisateurs/${idUtilisateur}/gamification`);

    return {
      points: response.data.points,
    };
  }
}
