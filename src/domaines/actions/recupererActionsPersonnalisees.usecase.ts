import { ActionsRepository } from '@/domaines/actions/ports/actions.repository';
import { ActionsDansUneThematiquePresenter } from '@/domaines/actions/ports/actionsDansUneThematiquePresenter';

export class RecupererActionsPersonnaliseesUsecase {
  constructor(private actionsRepository: ActionsRepository) {}

  async execute(
    idUtilisateur: string,
    thematiqueId: string,
    presenter: ActionsDansUneThematiquePresenter,
  ): Promise<void> {
    const actions = await this.actionsRepository.recupererActionsPersonnalisees(idUtilisateur, thematiqueId);
    if (actions.idEnchainementKYCs && actions.doitRepondreAuxKYCs) {
      presenter.presenteEnchainementKYCs(actions.idEnchainementKYCs);
    } else {
      presenter.presenteActions(actions.actions);
    }
  }
}
