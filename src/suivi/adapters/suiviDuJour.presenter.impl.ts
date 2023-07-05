import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { SuiviDuJourPresenter } from "@/suivi/ports/suiviDuJour.presenter";

export interface ImpactCarboneDuJourViewModel {
  valeur: string;
  pictoSens: string;
}
export interface SuivisPrecedentViewModel {
  datesDesSuivis: string[];
  valeursDesSuivis: number[];
}

export interface SuiviDuJourResultatsViewModel {
  impactCarbonDuJour: ImpactCarboneDuJourViewModel;
  suivisPrecedent: SuivisPrecedentViewModel;
}
export class SuiviDuJourPresenterImpl implements SuiviDuJourPresenter {
  private _viewModel: (suiviDuJourResultat: SuiviDuJourResultatsViewModel) => void;

  constructor(viewModel: (suiviDuJourResultat: SuiviDuJourResultatsViewModel) => void) {
    this._viewModel = viewModel;
  }

  presente(resultat: Resultat) {
    this._viewModel({
      impactCarbonDuJour: {
        valeur: resultat?.impactCarbonDuJour.valeur,
        pictoSens: resultat?.impactCarbonDuJour.enHausse ? "fr-icon-arrow-right-up-circle-fill" : "fr-icon-arrow-right-down-circle-fill",
      },
      suivisPrecedent: {
        datesDesSuivis: resultat?.suivisPrecedent.datesDesSuivis,
        valeursDesSuivis: resultat?.suivisPrecedent.valeursDesSuivis.map((impactCarbon) => impactCarbon / 1000),
      },
    });
  }
}
