import { ActionPresenter, ActionViewModel } from '@/domaines/actions/ports/action.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';

export class ActionPresenterImpl implements ActionPresenter {
  constructor(private readonly actionViewModel: (viewModel: ActionViewModel) => void) {}

  presenteAction(action: Action) {
    this.actionViewModel({
      titre: action.titre,
      sousTitre: action.sousTitre,
      corps: {
        astuces: action.corps.astuces,
        introduction: action.corps.introduction,
      },
      recommandations: action.recommandations,
    });
  }
}
