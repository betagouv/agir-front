import { ChargerInteractionsUsecase, Interaction, InteractionCategorie, InteractionType } from "../../src/interactions/chargerInteractions.usecase";
import { InteractionsPresenterImpl, InteractionViewModel } from "../../src/interactions/adapters/interactions.presenter.impl";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";

class InteractionsRepositoryForTest implements InteractionsRepository {
  chargerInteractions(nomUtilisateur: string): Interaction[] {
    return [
      {
        titre: "Faites le bilan du jour",
        sousTitre: "",
        categorie: InteractionCategorie.ALIMENTATION,
        nombreDePointsAGagner: "+25",
        miseEnAvant: "RECOMMANDÉ",
        type: InteractionType.KYC,
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
          categorie: "🥦 Se nourrir - Activités",
          nombreDePointsAGagner: "+25",
          miseEnAvant: "RECOMMANDÉ",
          type: "KYC",
          illustrationURL: "https://picsum.photos/356/213",
          url: "/quiz/1",
          isUrlExterne: false,
        },
      ]);
    }
  });
});
