import { ActionPresenter, ActionViewModel } from '@/domaines/actions/ports/action.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';
import marked from '@/shell/markdownToHtml';

export class ActionPresenterImpl implements ActionPresenter {
  constructor(private readonly actionViewModel: (viewModel: ActionViewModel) => void) {}

  async presenteAction(action: Action) {
    const [titre, sousTitre, astuces, introduction] = await Promise.all([
      marked.parseInline(action.titre),
      marked.parseInline(action.sousTitre),
      marked.parse(action.corps.astuces),
      marked.parse(action.corps.introduction),
    ]);

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
