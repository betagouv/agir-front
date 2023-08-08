import { Resultat } from "../../src/suivi/envoyerSuiviDuJour.usecase";
import { ResultatSuiviDuJourUsecase } from "../../src/suivi/resultatSuiviDuJour.usecase";
import { SuiviDuJourPresenter } from "../../src/suivi/ports/suiviDuJour.presenter";
import { DernierSuivi, SuiviRepository } from "../../src/suivi/ports/suivi.repository";

class SpySuiviDuJourPresenter implements SuiviDuJourPresenter {
  get aEteAppele(): boolean {
    return this._aEteAppele;
  }
  private _aEteAppele = false;
  presente(resultat: Resultat) {
    this._aEteAppele = true;
  }
}

class MockSuiviRepository implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {}

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi | null> {
    return Promise.resolve(null);
  }

  recupererResultat(utilisateurId: string): Promise<Resultat> {
    return Promise.resolve({
      impactCarbonDuJour: { valeur: 21000, enHausse: true, variation: 3000 },
      suivisPrecedent: {
        datesDesSuivis: ["27/07", "28/07", "29/07", "30/07"],
        valeursDesSuivis: [23000, 43000, 12000, 25000],
        moyenneDesSuivis: 21000,
      },
      additionCarboneDuJour: [
        { valeur: 2, impactCarbone: 2000, titre: "viande_rouge" },
        { valeur: 20, impactCarbone: 8000, titre: "km_voiture" },
        { valeur: 10, impactCarbone: 4000, titre: "km_metro" },
        { valeur: 20, impactCarbone: 2000, titre: "km_velo" },
        { valeur: 15, impactCarbone: 80000, titre: "km_train" },
        { valeur: 40, impactCarbone: 16000, titre: "km_bus" },
        { valeur: 1, impactCarbone: 1000, titre: "viande_blanche" },
        { valeur: 1, impactCarbone: 1000, titre: "poisson_blanc" },
        { valeur: 2, impactCarbone: 2000, titre: "oeufs" },
        { valeur: 1, impactCarbone: 1000, titre: "poisson_rouge" },
      ],
    } as Resultat);
  }
}
class AucunSuiviRepository implements SuiviRepository {
  ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {}

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi | null> {
    return Promise.resolve(null);
  }

  recupererResultat(utilisateurId: string): Promise<Resultat | null> {
    return Promise.resolve(null);
  }
}
describe("Fichier de tests de la récupération du suivi du jour", () => {
  it("Doit appeler le presenter quand le suivi du jour est dispo", async () => {
    // GIVEN
    const useCase = new ResultatSuiviDuJourUsecase(new MockSuiviRepository());
    // WHEN
    const spySuiviDuJourPresenter = new SpySuiviDuJourPresenter();
    await useCase.execute(spySuiviDuJourPresenter, "idUtilisateur");
    // THEN
    expect(spySuiviDuJourPresenter.aEteAppele).toBeTruthy();
  });
  it("Ne doit pas appeler le presenter quand le suivi du jour n'est pas dispo", async () => {
    // GIVEN
    const useCase = new ResultatSuiviDuJourUsecase(new AucunSuiviRepository());
    // WHEN
    const spySuiviDuJourPresenter = new SpySuiviDuJourPresenter();
    await useCase.execute(spySuiviDuJourPresenter, "idUtilisateur");
    // THEN
    expect(spySuiviDuJourPresenter.aEteAppele).toBeFalsy();
  });
});
