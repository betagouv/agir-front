import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

export class FiltrerCatalogueActionsUsecase {
  constructor(private readonly actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    filtresThematiques: string[],
    titre: string,
    filtreDejaVu: boolean,
    presenter: CatalogueActionsPresenter,
  ): Promise<void> {
    const actions = await this.actionsRepository.recupererActionsAvecFiltre(
      idUtilisateur,
      filtresThematiques,
      titre,
      filtreDejaVu,
    );
    presenter.presente(actions);
  }
}
