import { SyntheseThematiquePresenter } from '@/domaines/thematiques/ports/syntheseThematique.presenter';
import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class RecupererSyntheseThematiques {
  constructor(private readonly repository: ThematiquesRepository) {}

  async execute(idUtilisateur: string, presenter: SyntheseThematiquePresenter) {
    const synthese = await this.repository.recupererSyntheseThematiques(idUtilisateur);
    await presenter.presente(synthese);
  }
}
