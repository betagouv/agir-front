import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class RecupererCatalogueActionsWinterUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(idUtilisateur: string, catalogueActionsPresenter: CatalogueActionsPresenter): Promise<void> {
    const actionsWinter = !idUtilisateur
      ? await this.actionsRepository.chargerCatalogueActionsWinter()
      : await this.actionsRepository.chargerCatalogueActionsUtilisateurWinter(idUtilisateur);

    await catalogueActionsPresenter.presenteCatalogue(actionsWinter);
  }
}
