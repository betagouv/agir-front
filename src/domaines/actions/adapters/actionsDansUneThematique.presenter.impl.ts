import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { Action, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ActionsDansUneThematiquePresenter } from '@/domaines/actions/ports/actionsDansUneThematiquePresenter';
import { SimulateursSupportes } from '@/shell/simulateursSupportes';

export class ActionsDansUneThematiquePresenterImpl
  extends ActionsPresenterImpl
  implements ActionsDansUneThematiquePresenter
{
  constructor(
    private readonly callBackActions: (viewModel: ActionViewModel[]) => void,
    private readonly callbackEnchainementKYCs: (idEnchainementKYCs: string) => void,
  ) {
    super(callBackActions);
  }

  presenteActions(actions: Action[]): void {
    const actionsFiltrees = actions.filter(
      action =>
        action.type !== TypeAction.SIMULATEUR ||
        action.code === SimulateursSupportes.VOITURE ||
        action.code === SimulateursSupportes.MAIF,
    );
    super.presente(actionsFiltrees);
  }

  presenteEnchainementKYCs(idEnchainementKYCs: string) {
    this.callbackEnchainementKYCs(idEnchainementKYCs);
  }
}
