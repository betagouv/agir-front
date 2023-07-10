import { EnvoyerSuiviDuJourUsecase, Resultat } from "../../src/suivi/envoyerSuiviDuJour.usecase";
import { SuiviDuJourPresenterImpl, SuiviDuJourResultatsViewModel } from "../../src/suivi/adapters/suiviDuJour.presenter.impl";
import { DernierSuivi, SuiviRepository } from "../../src/suivi/ports/suivi.repository";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";
import { Interaction } from "../../src/interactions/chargerInteractions.usecase";

class SpyInteractionRepository implements InteractionsRepository {
  get interactionAEteTermineeAEteAppelee(): boolean {
    return this._interactionAEteTermineeAEteAppelee;
  }
  private _interactionAEteTermineeAEteAppelee: boolean = false;
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve([]);
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {}

  interactionAEteTerminee(interactionId: string, utilisateurId: string): void {
    this._interactionAEteTermineeAEteAppelee = true;
  }
}
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

  recupererResultat(): Promise<Resultat> {
    return Promise.resolve(this._resultat);
  }

  recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi> {
    return Promise.resolve({
      date: "",
      valeurs: new Map<string, string>(),
    });
  }
}

describe("Fichier de tests de l'envoie du suivi du jour", () => {
  it("Après avoir envoyé le suivi du jour doit dire que l'interaction est terminée et presenter un dashboard dans le cas d'un bilan en hausse", async () => {
    // GIVEN
    const resultat = {
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
    } as Resultat;
    const spySuiviRepository = new SpySuiviRepository(resultat);
    const spyInteractionRepository = new SpyInteractionRepository();
    const useCase = new EnvoyerSuiviDuJourUsecase(spySuiviRepository, spyInteractionRepository);
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
    await useCase.execute(suiviAlimentation, suiviTransport, new SuiviDuJourPresenterImpl(expectation), "idUtilisateur", "idInteraction");
    // THEN
    expect(spySuiviRepository.typeEnvoye).toStrictEqual(["alimentation", "transport"]);
    expect(spySuiviRepository.valeursEnvoyees).toStrictEqual([mapSuiviAlimentation, mapSuiviTransport]);
    expect(spyInteractionRepository.interactionAEteTermineeAEteAppelee).toBeTruthy();
    function expectation(suiviDuJourResultat: SuiviDuJourResultatsViewModel) {
      expect(suiviDuJourResultat).toStrictEqual<SuiviDuJourResultatsViewModel>({
        impactCarbonDuJour: {
          valeur: 21,
          pictoSens: "fr-icon-arrow-right-up-circle-fill",
          commentaire: "En hausse",
          variation: 3,
        },
        suivisPrecedent: {
          datesDesSuivis: ["27/07", "28/07", "29/07", "30/07"],
          valeursDesSuivis: [23, 43, 12, 25],
          moyenneDesSuivis: [21, 21, 21, 21],
        },
        additionCarbone: [
          {
            impactCarbone: "+80 kg",
            valeur: "15 km de train",
            styleFont: "carbon-value-item-primary",
          },
          {
            impactCarbone: "+16 kg",
            valeur: "40 km de bus",
            styleFont: "carbon-value-item-primary",
          },
          {
            impactCarbone: "+8 kg",
            valeur: "20 km de voiture",
            styleFont: "carbon-value-item-primary",
          },
          {
            impactCarbone: "+4 kg",
            valeur: "10 km de metro",
            styleFont: "carbon-value-item-secondary",
          },
          {
            impactCarbone: "+2 kg",
            valeur: "2 repas avec viande rouge",
            styleFont: "carbon-value-item-secondary",
          },
          {
            impactCarbone: "+2 kg",
            valeur: "20 km de velo",
            styleFont: "carbon-value-item-secondary",
          },
          {
            impactCarbone: "+2 kg",
            valeur: "2 repas avec oeufs",
            styleFont: "carbon-value-item-secondary",
          },
          {
            impactCarbone: "+1 kg",
            valeur: "1 repas avec viande blanche",
            styleFont: "carbon-value-item-secondary",
          },
          {
            impactCarbone: "+1 kg",
            valeur: "1 repas avec poisson blanc",
            styleFont: "carbon-value-item-secondary",
          },
          {
            impactCarbone: "+1 kg",
            valeur: "1 repas avec poisson rouge",
            styleFont: "carbon-value-item-secondary",
          },
        ],
      });
    }
  });
});
