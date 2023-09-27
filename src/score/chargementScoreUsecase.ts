import { ChargementScorePresenter } from '@/score/ports/chargementScorePresenter';
import { ScoreRepository } from '@/score/ports/scoreRepository';

export class ChargementScoreUsecase {
  private dashboardRepository: ScoreRepository;
  constructor(dashboardRepository: ScoreRepository) {
    this.dashboardRepository = dashboardRepository;
  }
  async execute(idUtilisateur: string, presenter: ChargementScorePresenter): Promise<void> {
    const dashboard = await this.dashboardRepository.getScore(idUtilisateur);
    presenter.presenteDashboard(idUtilisateur, dashboard);
  }
}
