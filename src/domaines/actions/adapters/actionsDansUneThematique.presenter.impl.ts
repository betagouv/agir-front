import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
import { Action } from '@/domaines/actions/ports/actions.repository';
import { ActionsDansUneThematiquePresenter } from '@/domaines/actions/ports/actionsDansUneThematiquePresenter';
import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';

export class ActionsDansUneThematiquePresenterImpl
  extends CatalogueActionsPresenterImpl
  implements ActionsDansUneThematiquePresenter
{
  constructor(
    private readonly callBackActions: (viewModel: CatalogueActionsViewModel) => void,
    private readonly callbackEnchainementKYCs: (idEnchainementKYCs: string) => void,
  ) {
    super(callBackActions);
  }

  presenteActions(actions: Action[]): void {
    super.presente(actions);
  }

  presenteEnchainementKYCs(idEnchainementKYCs: string) {
    this.callbackEnchainementKYCs(idEnchainementKYCs);
  }
}
