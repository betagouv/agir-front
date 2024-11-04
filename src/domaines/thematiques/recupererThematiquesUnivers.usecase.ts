import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';

export class RecupererThematiquesUniversUsecase {
  constructor(private readonly thematiqueRepository: MissionsRepository) {}

  async execute(universId: string, utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererMissions(universId, utilisateurId);
    presenter.present(thematiques);
  }
}
