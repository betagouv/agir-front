import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/domaines/defi/ports/listeDefis.presenter';

export class RecupererTousLesDefisUsecase {
  constructor(private readonly defiRepository: DefiRepository) {}

  async execute(utilisateurId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defiRepository.recupererTousLesDefis(utilisateurId);
    presenter.presente(defis);
  }
}
