import { ObtenirDernierSuiviUsecase } from "../../src/suivi/obtenirDernierSuivi.usecase";
import { DernierSuivi, SuiviRepository } from "../../src/suivi/ports/suivi.repository";
import { Resultat } from "../../src/suivi/envoyerSuiviDuJour.usecase";
import { DernierSuiviDuJourPresenterImpl, DernierSuiviDuJourViewModel } from "../../src/suivi/adapters/dernierSuiviDuJour.presenter.impl";
import { DateTime } from "../../src/DateTime";

class MockDateTime implements DateTime {
  from(date: string): Date {
    return new Date("2023-07-03 12:02:04.829");
  }

  now(): Date {
    return new Date("2023-07-05 12:02:04.829");
  }
}
class MockSuiviRepository implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {}

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi> {
    return Promise.resolve({
      date: "03/07/2023",
      valeurs: new Map<string, string>([
        ["viande_rouge", "1"],
        ["viande_blanche", "1"],
        ["poisson", "1"],
        ["laitages", "1"],
        ["oeufs", "1"],
        ["poisson_rouge", "1"],
        ["poisson_blanc", "1"],
        ["legumes", "1"],
      ]),
    });
  }

  recupererResultat(): Resultat {
    return {
      valeur: "valeur",
      enHausse: false,
    };
  }
}
describe("Fichier de tests concernant la récupération du dernier suivi", () => {
  it("Le suivi alimentation doit renvoyer une map avec une date", async () => {
    // GIVEN
    const useCase = new ObtenirDernierSuiviUsecase(new MockSuiviRepository());
    // WHEN
    await useCase.execute("idUtilisateur", "alimentation", new DernierSuiviDuJourPresenterImpl(expectation, new MockDateTime()));
    // THEN
    function expectation(dernierSuiviViewModel: DernierSuiviDuJourViewModel) {
      expect(dernierSuiviViewModel).toStrictEqual<DernierSuiviDuJourViewModel>({
        date: "Dernier suivi il y a 2 jours",
        clefsEtValeurs: new Map<string, string>([
          ["viande_rouge", "1"],
          ["viande_blanche", "1"],
          ["poisson", "1"],
          ["laitages", "1"],
          ["oeufs", "1"],
          ["poisson_rouge", "1"],
          ["poisson_blanc", "1"],
          ["legumes", "1"],
        ]),
      });
    }
  });
});
