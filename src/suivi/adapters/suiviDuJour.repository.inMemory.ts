import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { SuiviRepository } from "@/suivi/ports/suivi.repository";

export class SuiviDuJourRepositoryInMemory implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>) {}

  recupererResultat(): Resultat {
    return {
      valeur: "21",
      enHausse: true,
    };
  }

  recupererDernierSuivi(idUtilisateur: string, type: string) {}
}
