import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';
import { Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesPresenter } from '@/domaines/aides/ports/chargementAides.presenter';
import { buildUrl } from '@/shell/buildUrl';

export class AidesPresenterImpl implements ChargementAidesPresenter {
  constructor(private _viewModel: (vm: ActionAideViewModel[]) => void) {}

  presente(aides: Aides, nombreAidesMax?: number): void {
    this._viewModel(
      aides.aides
        .map(aide => ({
          titre: aide.titre,
          titreUrl: buildUrl(aide.titre),
          id: aide.id,
          partenaireNom: aide.partenaire?.nom ?? '',
          partenaireImg: aide.partenaire?.logoUrl,
          montantMaximum: aide.montantMaximum ? `${aide.montantMaximum}€` : undefined,
          estGratuit: aide.estGratuit,
        }))
        .slice(0, nombreAidesMax),
    );
  }
}
