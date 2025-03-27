import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { GamificationPresenter } from '@/domaines/score/ports/gamification.presenter';
import { ScoreRepository } from '@/domaines/score/ports/score.repository';

export class ChargementScoreUsecase {
  constructor(
    private scoreRepository: ScoreRepository,
    private sessionRepostory: SessionRepository,
  ) {}

  async execute(idUtilisateur: string, presenter: GamificationPresenter): Promise<void> {
    const gamification = await this.scoreRepository.getGamification(idUtilisateur);
    presenter.presente(gamification);
  }
}
