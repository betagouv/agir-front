import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';

export class RecupererListeMissionThematiqueRecommandeeUsecase {
  constructor(private readonly thematiqueRepository: ThematiqueRepository) {}

  async execute(utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererMissionThematiqueRecommandee(utilisateurId);
    presenter.present(thematiques);
  }
}
