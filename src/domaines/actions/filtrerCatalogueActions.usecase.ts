import { Filtres, FiltreStatut } from '@/domaines/actions/filtres';
import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class FiltrerCatalogueActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    statut: FiltreStatut,
    catalogueActionsPresenter: CatalogueActionsPresenter,
  ): Promise<void> {
    const filtres = idUtilisateur
      ? Filtres.pourUtilisateurConnecte(idUtilisateur, filtresThematiques, titre, statut)
      : Filtres.pourUtilisateurNonConnecte(filtresThematiques, titre);

    const catalogue = await this.actionsRepository.filtrerCatalogueActions(filtres);
    await catalogueActionsPresenter.presenteCatalogue(catalogue);
  }
}
