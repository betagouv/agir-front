import { ChargerInteractionsUsecase, Interaction } from "../../src/interactions/chargerInteractions.usecase";
import { InteractionsPresenterImpl, InteractionViewModel } from "../../src/interactions/adapters/interactions.presenter.impl";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";

class InteractionsRepositoryForTest implements InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Interaction[] {
    return [
      {
        titre: "Faites le bilan du jour",
        sousTitre: "",
        categorie: "Alimentation",
        nombreDePointsAGagner: "+25",
        miseEnAvant: "RECOMMANDÉ",
        type: "quiz",
      },
    ];
  }
}

describe("Fichier de tests pour charger les interactions", () => {
  it("En donnant un nom d'utilisateur doit charger les interactions", () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(new InteractionsRepositoryForTest());
    usecase.execute("Dorian", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          titre: "Faites le bilan du jour",
          sousTitre: "",
          categorie: "Alimentation",
          nombreDePointsAGagner: "+25",
          miseEnAvant: "RECOMMANDÉ",
          type: "quiz",
        },
      ]);
    }
  });
});
