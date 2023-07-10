import { ChargerInteractionsUsecase, Interaction, InteractionCategorie, InteractionType } from "../../src/interactions/chargerInteractions.usecase";
import { InteractionsPresenterImpl, InteractionViewModel } from "../../src/interactions/adapters/interactions.presenter.impl";
import { InteractionsRepository } from "../../src/interactions/ports/interactionsRepository";

class InteractionsRepositoryForTest implements InteractionsRepository {
  private readonly _interaction: Interaction[];
  constructor(interaction: Interaction[]) {
    this._interaction = interaction;
  }
  chargerInteractions(nomUtilisateur: string): Promise<Interaction[]> {
    return Promise.resolve(this._interaction);
  }

  interactionAEteCliquee(interactionId: string, utilisateurId): void {}

  interactionAEteTerminee(interactionId: string, utilisateurId: string): void {}
}

describe("Fichier de tests pour charger les interactions", () => {
  it("En donnant un id d'utilisateur et dans le cas d'un quiz", async () => {
    // GIVEN
    // WHEN
    const interactionQuizzAFaire = {
      id: "id",
      type: InteractionType.QUIZ,
      titre: "titre",
      sousTitre: "sousTitre",
      categorie: InteractionCategorie.ALIMENTATION,
      nombreDePointsAGagner: "nombreDePointsAGagner",
      miseEnAvant: "miseEnAvant",
      illustrationURL: "illustrationURL",
      url: "/quiz/id",
      aEteFaite: false,
    };
    const usecase = new ChargerInteractionsUsecase(new InteractionsRepositoryForTest([interactionQuizzAFaire]));
    await usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          id: "id",
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
  it("En donnant un id d'utilisateur et dans le cas d'un article", async () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(
      new InteractionsRepositoryForTest([
        {
          id: "id",
          type: InteractionType.ARTICLE,
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: InteractionCategorie.CONSOMMATION,
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          illustrationURL: "illustrationURL",
          url: "url",
          aEteFaite: false,
        },
      ])
    );
    await usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          id: "id",
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: "📱 Consommation",
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          type: "ARTICLE",
          illustrationURL: "illustrationURL",
          url: "url",
          isUrlExterne: true,
        },
      ]);
    }
  });
  it("En donnant un id d'utilisateur et dans le cas d'un suivi du jour", async () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(
      new InteractionsRepositoryForTest([
        {
          id: "id",
          type: InteractionType.SUIVIDUJOUR,
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: InteractionCategorie.GLOBAL,
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          illustrationURL: "illustrationURL",
          url: "",
          aEteFaite: false,
        },
      ])
    );
    await usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          id: "id",
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: "🌍 Global",
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          type: "SUIVI",
          illustrationURL: "illustrationURL",
          url: "/coach/suivi-du-jour",
          isUrlExterne: false,
        },
      ]);
    }
  });
  it("En donnant un id d'utilisateur et dans le cas d'un suivi d'un kyc", async () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(
      new InteractionsRepositoryForTest([
        {
          id: "id",
          type: InteractionType.KYC,
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: InteractionCategorie.GLOBAL,
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          illustrationURL: "illustrationURL",
          url: "",
          aEteFaite: false,
        },
      ])
    );
    await usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          id: "id",
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: "🌍 Global",
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          type: "KYC",
          illustrationURL: "illustrationURL",
          url: "",
          isUrlExterne: false,
        },
      ]);
    }
  });
  it("Dans le cas de plusieurs interactions faites et à faire on ne doit presenter que les interactions faites", async () => {
    // GIVEN
    // WHEN
    const usecase = new ChargerInteractionsUsecase(
      new InteractionsRepositoryForTest([
        {
          id: "id",
          type: InteractionType.KYC,
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: InteractionCategorie.GLOBAL,
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          illustrationURL: "illustrationURL",
          url: "",
          aEteFaite: false,
        },
        {
          id: "id2",
          type: InteractionType.KYC,
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: InteractionCategorie.GLOBAL,
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          illustrationURL: "illustrationURL",
          url: "",
          aEteFaite: true,
        },
      ])
    );
    await usecase.execute("1", new InteractionsPresenterImpl(expectation));
    // THEN
    function expectation(interactionViewModels: InteractionViewModel[]) {
      expect(interactionViewModels).toStrictEqual<InteractionViewModel[]>([
        {
          id: "id",
          titre: "titre",
          sousTitre: "sousTitre",
          categorie: "🌍 Global",
          nombreDePointsAGagner: "nombreDePointsAGagner",
          miseEnAvant: "miseEnAvant",
          type: "KYC",
          illustrationURL: "illustrationURL",
          url: "",
          isUrlExterne: false,
        },
      ]);
    }
  });
});
