import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';

export class RecupererMissionsRecommandeesUsecase {
  constructor(private readonly missionsRepository: MissionsRepository) {}

  async execute(utilisateurId: string, presenter: MissionsPresenter): Promise<void> {
    const missions = await this.missionsRepository.recupererMissionsRecommandees(utilisateurId);
    presenter.presente(missions);
  }
}
