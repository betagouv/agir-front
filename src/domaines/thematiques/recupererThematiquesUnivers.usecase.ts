import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { ThematiquesPresenter } from '@/domaines/thematiques/ports/thematiques.presenter';

export class RecupererThematiquesUniversUsecase {
  constructor(private readonly thematiqueRepository: ThematiqueRepository) {}

  async execute(universId: string, utilisateurId: string, presenter: ThematiquesPresenter): Promise<void> {
    const thematiques = await this.thematiqueRepository.recupererThematiques(universId, utilisateurId);
    presenter.present(thematiques);
  }
}
