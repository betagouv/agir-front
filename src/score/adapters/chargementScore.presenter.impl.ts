import { ChargementScorePresenter, ScoreViewModel } from '@/score/ports/chargementScore.presenter';
import { Score } from '@/score/ports/score.repository';
import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteCoachName } from '@/router/coach/routeCoachName';

export class ChargementScorePresenterImpl implements ChargementScorePresenter {
  constructor(private scoreViewModel: (viewModel: ScoreViewModel) => void) {}

  presenteScore(score: Score): void {
    this.scoreViewModel({
      points: score.points,
      niveau: score.niveau,
      nombreDePointsDansLeNiveau: score.nombreDePointsDansLeNiveau,
      nombreDePointsDuNiveau: score.nombreDePointsDuNiveau,
      celebration: score.celebration
        ? {
            id: score.celebration.id,
            type: score.celebration.type,
            titre: score.celebration.titre,
            new_niveau: score.celebration.new_niveau,
            reveal: score.celebration.reveal
              ? {
                  titre: score.celebration.reveal.titre,
                  description: score.celebration.reveal.description,
                  routeName: this.determinerRouteNameReveal(score.celebration.reveal.feature),
                  feature: score.celebration.reveal.feature,
                }
              : null,
          }
        : null,
    });
  }

  private determinerRouteNameReveal(feature: string) {
    switch (feature) {
      case Fonctionnalites.AIDES:
        return RouteAidesName.VOS_AIDES;
      case Fonctionnalites.SERVICES:
        return RouteCoachName.SERVICES;
      case Fonctionnalites.RECOMMANDATIONS:
        return RouteCoachName.COACH;
      default:
        return RouteCoachName.COACH;
    }
  }
}
