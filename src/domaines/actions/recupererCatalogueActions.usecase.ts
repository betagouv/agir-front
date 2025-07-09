import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererCatalogueActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(idUtilisateur: string, catalogueActionsPresenter: CatalogueActionsPresenter): Promise<void> {
    const catalogueActions = !idUtilisateur
      ? await this.actionsRepository.chargerCatalogueActions()
      : await this.actionsRepository.chargerCatalogueActionsUtilisateur(idUtilisateur);

    await catalogueActionsPresenter.presenteCatalogue(catalogueActions);
  }
}
