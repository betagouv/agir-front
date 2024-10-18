import { Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesPresenter } from '@/domaines/aides/ports/chargementAides.presenter';
import { RouteAidesPath } from '@/router/aides/routes';

export interface AideNonGroupeeViewModel {
  id: string;
  titre: string;
  isSimulateur: boolean;
  url: string;
}
export class ChargementAidesNonGroupeesPresenterImpl implements ChargementAidesPresenter {
  constructor(private _viewModel: (aides: AideNonGroupeeViewModel[]) => void) {}

  presente(aides: Aides): void {
    this._viewModel(
      aides.aides.slice(0, 5).map(aide => ({
        id: aide.id,
        titre: aide.titre,
        isSimulateur: aide.isSimulateur,
        url: aide.isSimulateur ? aide.url : `${RouteAidesPath.AIDES}#aide_${aide.id}`,
      })),
    );
  }
}
