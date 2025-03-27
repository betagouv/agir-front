import { GamificationPresenter } from '@/domaines/score/ports/gamification.presenter';
import { Gamification } from '@/domaines/score/ports/score.repository';

export type GamificationViewModel = {
  points: number;
  badges: {
    illustration: string;
    libelle: string;
    description: string;
  }[];
};

export class GamificationPresenterImpl implements GamificationPresenter {
  constructor(private readonly callback: (gamification: GamificationViewModel) => void) {}

  presente(gamification: Gamification): void {
    this.callback({
      points: gamification.nombreDePoints,
      badges: gamification.badges.map(badge => {
        return {
          illustration: badge.getIllustration(),
          libelle: badge.libelle,
          description: badge.description,
        };
      }),
    });
  }
}
