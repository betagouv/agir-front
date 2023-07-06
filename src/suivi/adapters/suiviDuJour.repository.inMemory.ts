import { Resultat } from "@/suivi/envoyerSuiviDuJour.usecase";
import { DernierSuivi, SuiviRepository } from "@/suivi/ports/suivi.repository";

export class SuiviDuJourRepositoryInMemory implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {
    console.log(type);
    console.log(valeurs);
    console.log(utilisateurId);
  }

  recupererResultat(): Resultat {
    return {
      valeur: "21",
      enHausse: true,
    };
  }

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi> {
    return Promise.resolve({
      date: "date",
      valeurs: new Map<string, string>(),
    });
  }
}
