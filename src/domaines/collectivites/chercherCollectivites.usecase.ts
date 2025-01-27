import { ChercherCollectivitesPresenter } from '@/domaines/collectivites/ports/chercherCollectivites.presenter';
import { CollectiviteRepository } from '@/domaines/collectivites/ports/collectivite.repository';

export class ChercherCollectivitesUsecase {
  constructor(private collectiviteRepository: CollectiviteRepository) {}

  async execute(recherche: string, presenter: ChercherCollectivitesPresenter) {
    const LIMITE_COLLECTIVITES = 40;
    const communes = await this.collectiviteRepository.chercherCollectivites(recherche, LIMITE_COLLECTIVITES);
    presenter.presente(communes, recherche);
  }
}
