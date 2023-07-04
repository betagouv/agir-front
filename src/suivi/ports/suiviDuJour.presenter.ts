import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";

export interface SuiviDuJourPresenter {
  presente(resultat: Resultat);
}
