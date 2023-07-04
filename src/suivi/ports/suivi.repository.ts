import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";

export interface SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>);
  recupererResultat(): Resultat;
  recupererDernierSuivi(idUtilisateur: string, type: string);
}
