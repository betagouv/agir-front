import { DernierSuiviPresenter } from "@/suivi/obtenirDernierSuivi.usecase";

export interface DernierSuiviDuJourViewModel {
  date: string;
  clefsEtValeurs: Map<string, string>;
}
export class DernierSuiviDuJourPresenterImpl implements DernierSuiviPresenter {
  private _viewModel: (dernierSuiviDuJour: DernierSuiviDuJourViewModel) => void;

  constructor(viewModel: (dernierSuiviDuJour: DernierSuiviDuJourViewModel) => void) {
    this._viewModel = viewModel;
  }

  presente(clefEtValeurs: Map<string, string>) {
    this._viewModel({
      date: "05/07/2023",
      clefsEtValeurs: clefEtValeurs,
    });
  }
}
