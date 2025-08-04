import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererCatalogueActionsMaifUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(catalogueActionsPresenter: CatalogueActionsPresenter): Promise<void> {
    const actionsMaif = await this.actionsRepository.chargerCatalogueActionsMaif();

    await catalogueActionsPresenter.presenteCatalogue(actionsMaif);
  }
}
