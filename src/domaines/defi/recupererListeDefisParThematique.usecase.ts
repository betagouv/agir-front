import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/domaines/defi/ports/listeDefis.presenter';

export class RecupererListeDefisParThematiqueUsecase {
  constructor(private defisRepository: DefiRepository) {}

  async execute(utilisateurId: string, universId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defisRepository.recupererListeDefisParThematique(utilisateurId, universId);
    presenter.presente(defis);
  }
}
