import { ActionPresenter, ActionViewModel } from '@/domaines/actions/ports/action.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';
import marked from '@/shell/markdownToHtml';

export class ActionPresenterImpl implements ActionPresenter {
  constructor(private readonly actionViewModel: (viewModel: ActionViewModel) => void) {}

  async presenteAction(action: Action) {
    const titre = await marked.parseInline(action.titre);
    const sousTitre = await marked.parseInline(action.sousTitre);
    const astuces = await marked.parse(action.corps.astuces);
    const introduction = await marked.parse(action.corps.introduction);

    this.actionViewModel({
      titre,
      sousTitre,
      corps: {
        astuces,
        introduction,
      },
      recommandations: action.recommandations,
    });
  }
}
