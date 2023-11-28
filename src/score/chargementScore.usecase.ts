import { ChargementScorePresenter } from '@/score/ports/chargementScore.presenter';
import { ScoreRepository } from '@/score/ports/score.repository';

export class ChargementScoreUsecase {
  constructor(private scoreRepository: ScoreRepository) {}
  async execute(idUtilisateur: string, presenter: ChargementScorePresenter): Promise<void> {
    const score = await this.scoreRepository.getScore(idUtilisateur);
    presenter.presenteScore(score);
  }
}
