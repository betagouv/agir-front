import { AxiosFactory, intercept40X } from '@/axios.factory';
import { Badge, Gamification, ScoreRepository, TypeDeBadge } from '@/domaines/score/ports/score.repository';

export interface ScoreApiModel {
  points: number;
  niveau: number;
  current_points_in_niveau: number;
  point_target_in_niveau: number;
  badges: {
    type: string;
    titre: string;
    description: string;
  }[];
}

export class ScoreRepositoryAxios implements ScoreRepository {
  @intercept40X()
  async getGamification(idUtilisateur: string): Promise<Gamification> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<ScoreApiModel>(`/utilisateurs/${idUtilisateur}/gamification`);

    return new Gamification(
      response.data.points,
      response.data.badges.map(badge => {
        return new Badge(badge.type as TypeDeBadge, badge.titre, badge.description);
      }),
    );
  }
}
