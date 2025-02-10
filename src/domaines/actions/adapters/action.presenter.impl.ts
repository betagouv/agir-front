import { ActionPresenter, ActionViewModel } from '@/domaines/actions/ports/action.presenter';
import { ActionDetail } from '@/domaines/actions/ports/actions.repository';
import marked from '@/shell/actionMarkdownToHtml';

export class ActionPresenterImpl implements ActionPresenter {
  constructor(private readonly actionViewModel: (viewModel: ActionViewModel) => void) {}

  async presenteAction(action: ActionDetail) {
    const [titre, sousTitre, astuces, introduction] = await Promise.all([
      marked.parseInline(action.titre),
      marked.parseInline(action.sousTitre ?? ''),
      marked.parse(action.corps.astuces ?? ''),
      marked.parse(action.corps.introduction ?? ''),
    ]);

    this.actionViewModel({
      titre,
      sousTitre,
      commune: action.commune,
      corps: {
        astuces,
        introduction,
      },
      recommandations: action.recommandations,
      services: action.services,
    });
  }
}
