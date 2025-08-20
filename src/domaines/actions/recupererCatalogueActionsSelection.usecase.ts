import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererSelectionActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(selection: string, catalogueActionsPresenter: CatalogueActionsPresenter): Promise<void> {
    const actionsSemaineMobilite = await this.actionsRepository.chargerSelectionActions(selection);

    await catalogueActionsPresenter.presenteCatalogue(actionsSemaineMobilite);
  }
}
