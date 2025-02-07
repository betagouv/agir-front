import { Action } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionsPresenter } from '@/domaines/actions/ports/catalogueActions.presenter';

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
}

export class CatalogueActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(private readonly viewModel: (viewModel: CatalogueActionsViewModel) => void) {}

  presente(actions: Action[]) {
    this.viewModel({
      actions: actions.map(action => ({
        code: action.code,
        titre: action.titre,
        nombreDePersonnes: `${action.nombreDePersonnes} défis réalisés`,
        aidesDisponibles:
          action.nombreAideDispobible > 0
            ? { nombreDaidesDisponibles: `${action.nombreAideDispobible} aides disponibles` }
            : undefined,
      })),
    });
  }
}
