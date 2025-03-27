import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Badge, Gamification, ScoreRepository, TypeDeBadge } from '@/domaines/score/ports/score.repository';

export interface ScoreApiModel {
  points: number;
  niveau: number;
  current_points_in_niveau: number;
  point_target_in_niveau: number;
  badges: {
    type: string;
    label: string;
    description: string;
  }[];
}

export class ScoreRepositoryAxios implements ScoreRepository {
  @intercept401()
  async getGamification(idUtilisateur: string): Promise<Gamification> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ScoreApiModel>(`/utilisateurs/${idUtilisateur}/gamification`);

    return new Gamification(
      response.data.points,
      response.data.badges.map(badge => {
        return new Badge(badge.type as TypeDeBadge, badge.label, badge.description);
      }),
    );
  }
}
