import { EnvoyerSuiviDuJourUsecase, Resultat } from "../../src/suivi/envoyerSuiviDuJour.usecase";
import { ImpactCarboneDuJourViewModel, SuiviDuJourPresenterImpl } from "../../src/suivi/adapters/suiviDuJour.presenter.impl";
import { SuiviRepository } from "../../src/suivi/ports/suivi.repository";

class SpySuiviRepository implements SuiviRepository {
  private _resultat: Resultat;

  constructor(resultat: Resultat) {
    this._resultat = resultat;
  }

  get valeursEnvoyees(): Map<string, string>[] {
    return this._valeursEnvoyees;
  }
  private _valeursEnvoyees: Map<string, string>[] = [];
  get typeEnvoye(): string[] {
    return this._typeEnvoye;
  }
  private _typeEnvoye: string[] = [];
  ajouter(type: string, valeurs: Map<string, string>) {
    this._typeEnvoye.push(type);
    this._valeursEnvoyees.push(valeurs);
  }

  recupererResultat(): Resultat {
    return this._resultat;
  }

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<Map<string, string>> {
    return Promise.resolve(new Map<string, string>());
  }
}

describe("Fichier de tests de l'envoie du suivi du jour", () => {
  it("Après avoir envoyé le suivi du jour doit presenter un dashboard dans le cas d'un bilan en hausse", () => {
    // GIVEN
    const resultat = { valeur: "21", enHausse: true } as Resultat;
    const repository = new SpySuiviRepository(resultat);
    const useCase = new EnvoyerSuiviDuJourUsecase(repository);
    const mapSuiviAlimentation = new Map<string, string>();
    mapSuiviAlimentation.set("viande_rouge", "1");
    const suiviAlimentation = {
      valeurs: mapSuiviAlimentation,
    };
    const mapSuiviTransport = new Map<string, string>();
    mapSuiviTransport.set("voiture", "1");
    const suiviTransport = {
      valeurs: mapSuiviTransport,
    };
    // WHEN
    useCase.execute(suiviAlimentation, suiviTransport, new SuiviDuJourPresenterImpl(expectation), "idUtilisateur");
    // THEN
    expect(repository.typeEnvoye).toStrictEqual(["alimentation", "transport"]);
    expect(repository.valeursEnvoyees).toStrictEqual([mapSuiviAlimentation, mapSuiviTransport]);
    function expectation(impactCarboneDuJour: ImpactCarboneDuJourViewModel) {
      expect(impactCarboneDuJour).toStrictEqual<ImpactCarboneDuJourViewModel>({
        valeur: "21",
        pictoSens: "fr-icon-arrow-right-up-circle-fill",
      });
    }
  });
});
