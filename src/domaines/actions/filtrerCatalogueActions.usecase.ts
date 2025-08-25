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
    const catalogue = !idUtilisateur
      ? await this.actionsRepository.filtrerCatalogueActions(filtresThematiques, titre)
      : await this.actionsRepository.filtrerCatalogueActionsUtilisateur(
          idUtilisateur,
          filtresThematiques,
          titre,
          filtreDejaVu,
          filtreDejaRealisees,
        );
    await catalogueActionsPresenter.presenteCatalogue(catalogue);
  }
}
