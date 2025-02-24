import { SyntheseThematiquePresenter } from '@/domaines/thematiques/ports/syntheseThematique.presenter';
import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';

export class RecupererSyntheseThematiques {
  constructor(private readonly repository: ThematiqueRepository) {}

  async execute(idUtilisateur: string, presenter: SyntheseThematiquePresenter) {
    const synthese = await this.repository.recupererSyntheseThematiques(idUtilisateur);
    await presenter.presente(synthese);
  }
}
