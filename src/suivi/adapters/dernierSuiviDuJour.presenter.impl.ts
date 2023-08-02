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

  convertiLesMinutesEnHeures(minutes: number): string {
    const heures = Math.floor(minutes / 60);
    const resultFinalDesHeures = String(heures).padStart(2, "0");
    const minutesRestantes = minutes % 60;
    const resultatFinalDesMinutes = String(minutesRestantes).padStart(2, "0");

    return `${resultFinalDesHeures}:${resultatFinalDesMinutes}`;
  }

  isTransportEnCommun(valeur: string): boolean {
    return valeur.includes("train") || valeur.includes("metro") || valeur.includes("bus");
  }

  formaterLesValeursDuSuivis(listeDesValeurs: Map<string, string>): Map<string, string> {
    const resultat: Map<string, string> = new Map();

    listeDesValeurs.forEach((value, key) => {
      if (this.isTransportEnCommun(key)) {
        resultat.set(key, this.convertiLesMinutesEnHeures(parseInt(value)));
      } else {
        resultat.set(key, value);
      }
    });
    return resultat;
  }

  presente(suivi: DernierSuivi) {
    const differenceEnJours = this.calculerNombreDeJoursDepuisLeDernierSuivi(suivi);
    this._viewModel({
      date: `Dernier suivi il y a ${differenceEnJours} jours`,
      clefsEtValeurs: this.formaterLesValeursDuSuivis(suivi.valeurs),
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
