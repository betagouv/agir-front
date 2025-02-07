import { Action } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';
import { RouteActionsName } from '@/router/actions/routes';
import { buildUrl } from '@/shell/buildUrl';

export interface CatalogueActionsViewModel {
  actions: CatalogueActionViewModel[];
}

export interface CatalogueActionViewModel {
  code: string;
  titre: string;
  nombreDePersonnes: string;
  aidesDisponibles?: {
    nombreDaidesDisponibles: string;
  };
  url: { name: string; params: { id: string; titre: string } };
}

export class CatalogueActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(private readonly viewModel: (viewModel: CatalogueActionsViewModel) => void) {}

  presente(actions: Action[]) {
    this.viewModel({
      actions: actions.map(action => ({
        code: action.code,
        titre: action.titre,
        url: { name: RouteActionsName.ACTION_INDIVIDUELLE, params: { id: action.code, titre: buildUrl(action.titre) } },
        nombreDePersonnes: `<span class="text--bold">${action.nombreDePersonnes}</span> défis réalisés`,
        aidesDisponibles:
          action.nombreAideDispobible > 0
            ? {
                nombreDaidesDisponibles: `<span class="text--bold">${action.nombreAideDispobible}</span> aides disponibles`,
              }
            : undefined,
      })),
    });
  }
}
