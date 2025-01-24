import { ChercherCollectivitesPresenter } from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
import { CollectiviteRepository } from '@/domaines/collectivites/ports/collectivite.repository';

export class ChercherCollectivitesUsecase {
  constructor(private collectiviteRepository: CollectiviteRepository) {}

  async execute(nom: string, presenter: ChercherCollectivitesPresenter) {
    const communes = await this.collectiviteRepository.findCollectivites(nom);
    presenter.presente(communes);
  }
}
