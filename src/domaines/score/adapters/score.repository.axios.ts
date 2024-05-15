import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Score, ScoreRepository } from '@/domaines/score/ports/score.repository';

export interface ScoreApiModel {
  points: number;
  niveau: number;
  current_points_in_niveau: number;
  point_target_in_niveau: number;
  celebrations: {
    id: string;
    type: 'niveau' | 'fin_mission';
    titre: string;
    new_niveau: number;
    reveal: {
      titre: string;
      description: string;
      url: string;
      feature: string;
    };
  }[];
}

export class ScoreRepositoryAxios implements ScoreRepository {
  @intercept401()
  async getScore(idUtilisateur: string): Promise<Score> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ScoreApiModel>(`/utilisateurs/${idUtilisateur}/gamification`);

    return {
      points: response.data.points,
      niveau: response.data.niveau,
      nombreDePointsDansLeNiveau: response.data.current_points_in_niveau,
      nombreDePointsDuNiveau: response.data.point_target_in_niveau,
      celebration: response.data.celebrations[0] ? response.data.celebrations[0] : null,
    };
  }
}
