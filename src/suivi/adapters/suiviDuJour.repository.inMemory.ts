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
      impactCarbonDuJour: {
        valeur: "14",
        enHausse: true,
      },
      suivisPrecedent: {
        datesDesSuivis: ["27/07", "28/07", "29/07", "30/07"],
        valeursDesSuivis: [23000, 43000, 12000, 25000],
      },
    };
  }

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi> {
    return Promise.resolve({
      date: "date",
      valeurs: new Map<string, string>(),
    });
  }
}
