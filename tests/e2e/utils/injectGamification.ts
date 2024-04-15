import { ScoreApiModel } from '@/score/adapters/score.repository.axios';

export class InjectGamification {
  private _gamification: ScoreApiModel;

  constructor() {
    this._gamification = {
      points: 0,
      niveau: 0,
      current_points_in_niveau: 0,
      point_target_in_niveau: 0,
      celebrations: [],
    };
  }

  avecPoints(points: number): InjectGamification {
    this._gamification.points = points;
    return this;
  }

  avecNiveau(niveau: number): InjectGamification {
    this._gamification.niveau = niveau;
    return this;
  }

  avecCurrentPointsInNiveau(current_points_in_niveau: number): InjectGamification {
    this._gamification.current_points_in_niveau = current_points_in_niveau;
    return this;
  }

  avecPointsTargetInNiveau(point_target_in_niveau: number): InjectGamification {
    this._gamification.point_target_in_niveau = point_target_in_niveau;
    return this;
  }

  avecCelebrations(celebrations: ScoreApiModel['celebrations']): InjectGamification {
    this._gamification.celebrations = celebrations;
    return this;
  }

  build(): ScoreApiModel {
    return this._gamification;
  }
}
