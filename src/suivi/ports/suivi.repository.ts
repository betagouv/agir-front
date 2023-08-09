import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";

export interface DernierSuivi {
  date: string;
  valeurs: Map<string, string>;
}
export interface SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string);
  recupererResultat(utilisateurId: string): Promise<Resultat | null>;
  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi | null>;
}
