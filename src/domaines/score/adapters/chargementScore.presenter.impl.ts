import { ChargementScorePresenter, ScoreViewModel } from '@/domaines/score/ports/chargementScore.presenter';
import { Score } from '@/domaines/score/ports/score.repository';

export class ChargementScorePresenterImpl implements ChargementScorePresenter {
  constructor(private scoreViewModel: (viewModel: ScoreViewModel) => void) {}

  presenteScore(score: Score): void {
    this.scoreViewModel({
      points: score.points,
      niveau: score.niveau,
      nombreDePointsDansLeNiveau: score.nombreDePointsDansLeNiveau,
      nombreDePointsDuNiveau: score.nombreDePointsDuNiveau,
    });
  }
}
