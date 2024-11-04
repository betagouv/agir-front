import { MissionsPresenter } from '@/domaines/missions/ports/missions.presenter';
import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';

export class RecupererListeThematiquesRecommandeesUsecase {
  constructor(private readonly thematiqueRepository: MissionsRepository) {}

  async execute(utilisateurId: string, presenter: MissionsPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererMissionsRecommandees(utilisateurId);
    presenter.presente(thematiques);
  }
}
