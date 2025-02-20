import { SyntheseThematiquePresenter } from '@/domaines/thematiques/ports/syntheseThematique.presenter';
import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';

export class RecupererSyntheseThematiques {
  constructor(private readonly repository: ThematiqueRepository) {}

  async execute(presenter: SyntheseThematiquePresenter) {
    const synthese = await this.repository.recupererSyntheseThematiques();
    await presenter.presente(synthese);
  }
}
