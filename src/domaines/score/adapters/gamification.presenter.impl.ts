import { GamificationPresenter } from '@/domaines/score/ports/gamification.presenter';
import { Gamification } from '@/domaines/score/ports/score.repository';

export type GamificationViewModel = {
  points: number;
  nombreDeBadges: number;
};

export class GamificationPresenterImpl implements GamificationPresenter {
  constructor(private readonly callback: (gamification: GamificationViewModel) => void) {}

  presente(gamification: Gamification): void {
    this.callback({
      points: gamification.nombreDePoints,
      nombreDeBadges: gamification.badges.length,
    });
  }
}
