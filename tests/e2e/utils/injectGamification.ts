import { ScoreApiModel } from '@/score/adapters/score.repository.axios';

export class InjectGamification {
  avecGamification(gamification: ScoreApiModel): ScoreApiModel {
    return gamification;
  }

  vierge(): ScoreApiModel {
    return {
      points: 0,
      niveau: 0,
      current_points_in_niveau: 0,
      point_target_in_niveau: 0,
      celebrations: [],
    };
  }
}
