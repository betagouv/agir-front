import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { ChargementScorePresenter } from '@/domaines/score/ports/chargementScore.presenter';
import { ScoreRepository } from '@/domaines/score/ports/score.repository';

export class ChargementScoreUsecase {
  constructor(
    private scoreRepository: ScoreRepository,
    private sessionRepository: SessionRepository,
  ) {}
  async execute(idUtilisateur: string, presenter: ChargementScorePresenter): Promise<void> {
    const score = await this.scoreRepository.getScore(idUtilisateur);
    const featureDebloquee = score.celebration?.reveal?.feature;
    if (featureDebloquee) {
      this.sessionRepository.nouvelleFeatureDebloquee(featureDebloquee);
    }
    presenter.presenteScore(score);
  }
}
