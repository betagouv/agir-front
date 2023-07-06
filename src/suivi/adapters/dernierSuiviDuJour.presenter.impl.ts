import { DernierSuiviPresenter } from "@/suivi/obtenirDernierSuivi.usecase";
import { DateTime } from "@/DateTime";
import { DernierSuivi } from "@/suivi/ports/suivi.repository";

export interface DernierSuiviDuJourViewModel {
  date: string;
  clefsEtValeurs: Map<string, string>;
}
export class DernierSuiviDuJourPresenterImpl implements DernierSuiviPresenter {
  private _viewModel: (dernierSuiviDuJour: DernierSuiviDuJourViewModel) => void;
  private _dateTime: DateTime;

  constructor(viewModel: (dernierSuiviDuJour: DernierSuiviDuJourViewModel) => void, dateTime: DateTime) {
    this._viewModel = viewModel;
    this._dateTime = dateTime;
  }

  presente(suivi: DernierSuivi) {
    const currentDate = this._dateTime.now();
    const lastFollowUpDate = this._dateTime.from(suivi.date);

    const differenceInMilliseconds = currentDate.getTime() - lastFollowUpDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    this._viewModel({
      date: `Dernier suivi il y a ${differenceInDays} jours`,
      clefsEtValeurs: suivi.valeurs,
    });
  }
}
