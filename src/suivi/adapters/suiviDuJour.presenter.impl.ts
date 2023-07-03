import { Resultat, SuiviDuJourPresenter } from "@/suivi/envoyerSuiviDuJour.usecase";

export interface ImpactCarboneDuJourViewModel {
  valeur: string;
  pictoSens: string;
  backgroundColor: string;
}
export class SuiviDuJourPresenterImpl implements SuiviDuJourPresenter {
  private _viewModel: (impactDuJourViewModel: ImpactCarboneDuJourViewModel) => void;

  constructor(viewModel: (impactCarboneDuJour: ImpactCarboneDuJourViewModel) => void) {
    this._viewModel = viewModel;
  }

  presente(resultat: Resultat) {
    this._viewModel({
      valeur: resultat.valeur,
      pictoSens: resultat.enHausse ? "up-red.svg" : "down-green.svg",
      backgroundColor: resultat.enHausse ? "#FFE8E5" : "#B8FEC9",
    });
  }
}
