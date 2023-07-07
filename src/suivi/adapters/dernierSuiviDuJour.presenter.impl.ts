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
    const differenceEnJours = this.calculerNombreDeJoursDepuisLeDernierSuivi(suivi);
    this._viewModel({
      date: `Dernier suivi il y a ${differenceEnJours} jours`,
      clefsEtValeurs: suivi.valeurs,
    });
  }

  private calculerNombreDeJoursDepuisLeDernierSuivi(dernierSuivi: DernierSuivi) {
    const dateDuJour = this._dateTime.now();
    const dateDuDernierSuivi = this._dateTime.from(dernierSuivi.date);
    dateDuJour.setHours(0, 0, 0, 0);
    dateDuDernierSuivi.setHours(0, 0, 0, 0);

    const differenceEnMillisecondes = dateDuJour.getTime() - dateDuDernierSuivi.getTime();
    return Math.floor(differenceEnMillisecondes / (1000 * 60 * 60 * 24));
  }
}
