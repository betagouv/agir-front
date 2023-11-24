import { ChargementScorePresenter, ScoreViewModel } from '@/score/ports/chargementScore.presenter';
import { Score } from '@/score/ports/score.repository';

export class ChargementScorePresenterImpl implements ChargementScorePresenter {
  constructor(private scoreViewModel: (viewmModel: ScoreViewModel) => void) {}

  presenteScore(score: Score): void {
    this.scoreViewModel({
      points: score.points,
      niveau: score.niveau,
      nombreDePointsDansLeNiveau: score.nombreDePointsDansLeNiveau,
      nombreDePointsDuNiveau: score.nombreDePointsDuNiveau,
    });
  }
}
