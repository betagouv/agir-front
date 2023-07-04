import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export interface ImpactCarboneDuJourViewModel {
  valeur: string;
  pictoSens: string;
}
export class SuiviDuJourPresenterImpl implements SuiviDuJourPresenter {
  private _viewModel: (impactDuJourViewModel: ImpactCarboneDuJourViewModel) => void;

  constructor(viewModel: (impactCarboneDuJour: ImpactCarboneDuJourViewModel) => void) {
    this._viewModel = viewModel;
  }

  presente(resultat: Resultat) {
    this._viewModel({
      valeur: resultat.valeur,
      pictoSens: resultat?.enHausse ? "fr-icon-arrow-right-up-circle-fill" : "fr-icon-arrow-right-down-circle-fill",
    });
  }
}
