import { ChargerInteractionsUsecase, Interaction, InteractionCategorie, InteractionType } from "../../src/interactions/chargerInteractions.usecase";
import { InteractionsPresenterImpl, InteractionViewModel } from "../../src/interactions/adapters/interactions.presenter.impl";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";

class InteractionsRepositoryForTest implements InteractionsRepository {
  private _interaction: Interaction;
  constructor(interaction: Interaction) {
    this._interaction = interaction;
  }
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve([this._interaction]);
  }
}

describe("Fichier de tests pour charger les interactions", () => {
  it("En donnant un id d'utilisateur et dans le cas d'un quiz", () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(
      new InteractionsRepositoryForTest({
        id: "id",
        type: InteractionType.QUIZ,
        titre: "titre",
        sousTitre: "sousTitre",
        categorie: InteractionCategorie.ALIMENTATION,
        nombreDePointsAGagner: "nombreDePointsAGagner",
        miseEnAvant: "miseEnAvant",
        illustrationURL: "illustrationURL",
      })
    );
    usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: "🥦 Alimentation",
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          type: "QUIZ",
          illustrationURL: "illustrationURL",
          url: "/quiz/id",
          isUrlExterne: false,
        },
      ]);
    }
  });
  it("En donnant un id d'utilisateur et dans le cas d'un article", () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(
      new InteractionsRepositoryForTest({
        id: "id",
        type: InteractionType.ARTICLE,
        titre: "titre",
        sousTitre: "sousTitre",
        categorie: InteractionCategorie.CONSOMMATION,
        nombreDePointsAGagner: "nombreDePointsAGagner",
        miseEnAvant: "miseEnAvant",
        illustrationURL: "illustrationURL",
      })
    );
    usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: "📱 Consommation",
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          type: "VIDEO",
          illustrationURL: "illustrationURL",
          url: "https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie/",
          isUrlExterne: true,
        },
      ]);
    }
  });
});
