import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';
import {
  CatalogueActionsPresenter,
  CatalogueActionsViewModel,
  ActionDuCatalogueViewModel,
} from '@/domaines/actions/ports/catalogueActions.presenter';
import { RouteActionsName } from '@/router/actions/routes';
import marked from '@/shell/actionMarkdownToHtml';
import { buildUrl } from '@/shell/buildUrl';
import { gererPluriel } from '@/shell/pluriel';

export class CatalogueActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(private readonly viewModel: (viewModel: CatalogueActionsViewModel) => void) {}

  async presente(catalogueActions: CatalogueActions): Promise<void> {
    const catalogueActionViewModel: ActionDuCatalogueViewModel[] = await Promise.all(
      catalogueActions.actions.map(async action => {
        const nombreDePersonnes = gererPluriel(
          action.nombreDePersonnes,
          `<span class="text--bold">${action.nombreDePersonnes}</span> défi réalisé`,
          `<span class="text--bold">${action.nombreDePersonnes}</span> défis réalisés`,
        );

        const aidesDisponibles =
          action.nombreAidesDisponibles === 0
            ? undefined
            : gererPluriel(
                action.nombreAidesDisponibles,
                `<span class="text--bold">${action.nombreAidesDisponibles}</span> aide disponible`,
                `<span class="text--bold">${action.nombreAidesDisponibles}</span> aides disponibles`,
              );

        return {
          code: action.code,
          titre: await marked.parseInline(action.titre),
          dejaVue: action.dejaVue,
          url: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: { id: action.code, titre: buildUrl(action.titre), type: action.type },
          },
          nombreDePersonnes,
          aidesDisponibles,
        };
      }),
    );

    this.viewModel({
      actions: catalogueActionViewModel,
      phraseNombreActions: `${catalogueActions.actions.length} action${catalogueActions.actions.length > 1 ? 's' : ''}`,
      filtres: catalogueActions.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
        checked: filtre.selected,
      })),
    });
  }
}
