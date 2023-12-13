import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Score, ScoreRepository } from '@/score/ports/score.repository';

interface ScoreApiModel {
  points: number;
  niveau: 0;
  current_points_in_niveau: 0;
  point_target_in_niveau: 0;
  celebrations: {
    id: string;
    type: 'niveau';
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
