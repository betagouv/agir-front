import { ChercherCollectivitesPresenter } from '@/domaines/communes/ports/chercherCollectivites.presenter';
import { CommuneRepository } from '@/domaines/communes/ports/communeRepository';

export class ChercherCollectivitesUsecase {
  constructor(private communeRepository: CommuneRepository) {}

  async execute(nom: string, presenter: ChercherCollectivitesPresenter) {
    const communes = await this.communeRepository.findCollectivites(nom);
    presenter.presente(communes);
  }
}
