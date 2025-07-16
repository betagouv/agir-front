import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererCatalogueActionsWinterUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(idUtilisateur: string, catalogueActionsPresenter: CatalogueActionsPresenter): Promise<void> {
    const actionsWinter = await this.actionsRepository.chargerCatalogueActionsWinter(idUtilisateur);

    await catalogueActionsPresenter.presenteCatalogue(actionsWinter);
  }
}
