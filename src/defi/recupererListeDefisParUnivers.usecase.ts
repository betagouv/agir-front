import { DefiRepository } from '@/defi/ports/defi.repository';
import { ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';

export class RecupererListeDefisParUniversUsecase {
  constructor(private defisRepository: DefiRepository) {}

  async execute(utilisateurId: string, universId: string, presenter: ListeDefisPresenter): Promise<void> {
    const defis = await this.defisRepository.recupererListeDefisParUnivers(utilisateurId, universId);
    presenter.presente(defis);
  }
}
