import { ChargementCommunesEPCIPresenter } from '@/domaines/communes/ports/chargementCommunesEPCI.presenter';
import { CommuneRepository } from '@/domaines/communes/ports/communeRepository';

export class ChargementCommunesEPCIUsecase {
  constructor(private communeRepository: CommuneRepository) {}

  async execute(nom: string, presenter: ChargementCommunesEPCIPresenter) {
    const communes = await this.communeRepository.getCommunesEPCI(nom);
    presenter.presente(communes);
  }
}
