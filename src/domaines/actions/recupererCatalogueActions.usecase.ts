import { ActionsPresenter } from '@/domaines/actions/ports/actions.presenter';
import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererCatalogueActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    catalogueActionsPresenter: CatalogueActionsPresenter,
    actionsPresenter: ActionsPresenter,
  ): Promise<void> {
    const catalogueActions = await this.actionsRepository.chargerCatalogueActions(idUtilisateur);
    catalogueActionsPresenter.presente(catalogueActions);
    actionsPresenter.presente(catalogueActions.actions);
  }
}
