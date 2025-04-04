import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class FiltrerCatalogueActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
    filtreDejaRealisees: boolean,
    catalogueActionsPresenter: CatalogueActionsPresenter,
  ): Promise<void> {
    const catalogue = await this.actionsRepository.filtrerCatalogueActions(
      idUtilisateur,
      filtresThematiques,
      titre,
      filtreDejaVu,
      filtreDejaRealisees,
    );
    catalogueActionsPresenter.presenteCatalogue(catalogue);
  }
}
