import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';
import { ActionsDansUneThematiquePresenter } from '@/domaines/actions/ports/actionsDansUneThematiquePresenter';

export class ActionsDansUneThematiquePresenterImpl
  extends ActionsPresenterImpl
  implements ActionsDansUneThematiquePresenter
{
  constructor(
    private readonly callBackActions: (viewModel: ActionViewModel[]) => void,
    private readonly callbackEnchainementKYCs: (idEnchainementKYCs: string, messageNgc: string) => void,
  ) {
    super(callBackActions);
  }

  presenteActions(actions: Action[]): void {
    super.presente(actions);
  }

  presenteEnchainementKYCs(idEnchainementKYCs: string, estUtilisateurNgc: boolean) {
    this.callbackEnchainementKYCs(
      idEnchainementKYCs,
      estUtilisateurNgc
        ? 'Vous n’avez pas renseigné vos habitudes sur ce thème lors de votre bilan Nos Gestes Climat'
        : '',
    );
  }
}
