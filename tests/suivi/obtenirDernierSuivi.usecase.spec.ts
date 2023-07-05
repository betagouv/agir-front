import { ObtenirDernierSuiviUsecase } from "../../src/suivi/obtenirDernierSuivi.usecase";
import { SuiviRepository } from "../../src/suivi/ports/suivi.repository";
import { Resultat } from "../../src/suivi/envoyerSuiviDuJour.usecase";
import { DernierSuiviDuJourPresenterImpl, DernierSuiviDuJourViewModel } from "../../src/suivi/adapters/dernierSuiviDuJour.presenter.impl";

class MockSuiviRepository implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {}

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<Map<string, string>> {
    return Promise.resolve(
      new Map<string, string>([
        ["viande_rouge", "1"],
        ["viande_blanche", "1"],
        ["poisson", "1"],
        ["laitages", "1"],
        ["oeufs", "1"],
        ["poisson_rouge", "1"],
        ["poisson_blanc", "1"],
        ["legumes", "1"],
      ])
    );
  }

  recupererResultat(): Resultat {
    return {
      valeur: "valeur",
      enHausse: false,
    };
  }
}
describe("Fichier de tests concernant la récupération du dernier suivi", () => {
  it("Le suivi alimentation doit renvoyer une map avec une date", () => {
    // GIVEN
    const useCase = new ObtenirDernierSuiviUsecase(new MockSuiviRepository());
    // WHEN
    useCase.execute("idUtilisateur", "alimentation", new DernierSuiviDuJourPresenterImpl(expectation));
    // THEN
    function expectation(dernierSuiviViewModel: DernierSuiviDuJourViewModel) {
      expect(dernierSuiviViewModel).toStrictEqual<DernierSuiviDuJourViewModel>({
        date: "05/07/2023",
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
