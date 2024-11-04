import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';

export class RecupererListeThematiquesRecommandeesUsecase {
  constructor(private readonly thematiqueRepository: MissionsRepository) {}

  async execute(utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererMissionsRecommandees(utilisateurId);
    presenter.present(thematiques);
  }
}
