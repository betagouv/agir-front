import { GamificationPresenter } from '@/domaines/score/ports/gamification.presenter';
import { Gamification } from '@/domaines/score/ports/score.repository';
import { NombreAfficheEnFR, NombreAfficheEnFRBuilder } from '@/shell/nombreAfficheEnFRBuilder';

export type GamificationViewModel = {
  points: NombreAfficheEnFR;
  nombreDeBadges: NombreAfficheEnFR | undefined;
};

export class GamificationPresenterImpl implements GamificationPresenter {
  constructor(private readonly callback: (gamification: GamificationViewModel) => void) {}

  presente(gamification: Gamification): void {
    this.callback({
      points: NombreAfficheEnFRBuilder.build(gamification.nombreDePoints),
      nombreDeBadges:
        gamification.badges.length === 0 ? undefined : NombreAfficheEnFRBuilder.build(gamification.badges.length),
    });
  }
}
