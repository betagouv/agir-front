import { Action } from '@/domaines/actions/ports/actions.repository';
import {
  CatalogueActionsPresenter,
  CatalogueActionsViewModel,
} from '@/domaines/actions/ports/catalogueActions.presenter';
import { RouteActionsName } from '@/router/actions/routes';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';

export class CatalogueActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(private readonly viewModel: (viewModel: CatalogueActionsViewModel) => void) {}

  async presente(actions: Action[]) {
    const actionsViewModel = await Promise.all(
      actions.map(async action => ({
        code: action.code,
        titre: await marked.parseInline(action.titre),
        url: {
          name: RouteActionsName.ACTION_INDIVIDUELLE,
          params: { id: action.code, titre: buildUrl(action.titre) },
        },
        nombreDePersonnes: `<span class="text--bold">${action.nombreDePersonnes}</span> défis réalisés`,
        aidesDisponibles:
          action.nombreAideDispobible > 0
            ? {
                nombreDaidesDisponibles: `<span class="text--bold">${action.nombreAideDispobible}</span> aides disponibles`,
              }
            : undefined,
      })),
    );

    this.viewModel({ actions: actionsViewModel });
  }
}
