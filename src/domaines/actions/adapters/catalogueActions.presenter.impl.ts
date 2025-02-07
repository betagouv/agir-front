import { Action } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';
import { RouteActionsName } from '@/router/actions/routes';

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
  url: { name: string; params: { id: number; titre: string } };
}

export class CatalogueActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(private readonly viewModel: (viewModel: CatalogueActionsViewModel) => void) {}

  presente(actions: Action[]) {
    this.viewModel({
      actions: actions.map(action => ({
        code: action.code,
        titre: action.titre,
        // TODO: récupérer l'id
        url: { name: RouteActionsName.ACTION_INDIVIDUELLE, params: { id: 0, titre: action.code } },
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
