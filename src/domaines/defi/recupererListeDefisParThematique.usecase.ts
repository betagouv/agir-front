import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/domaines/defi/ports/listeDefis.presenter';

export class RecupererListeDefisParThematiqueUsecase {
  constructor(private defisRepository: DefiRepository) {}

  async execute(utilisateurId: string, thematiqueId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defisRepository.recupererListeDefisParThematique(utilisateurId, thematiqueId);
    presenter.presente(defis);
  }
}
