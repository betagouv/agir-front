import { Interaction, InteractionCategorie, InteractionType } from "@/interactions/chargerInteractions.usecase";
import { InteractionsPresenter } from "@/interactions/ports/interactionsPresenter";

export interface InteractionViewModel {
  titre: string;
  sousTitre: string;
  categorie: string;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
  type: string;
  illustrationURL: string;
  url: string;
  isUrlExterne: boolean;
}
export class InteractionsPresenterImpl implements InteractionsPresenter {
  private _viewModels: (interactionViewModels: InteractionViewModel[]) => void;
  constructor(viewModels: (interactionViewModels: InteractionViewModel[]) => void) {
    this._viewModels = viewModels;
  }

  presente(interactions: Interaction[]) {
    const categorieInverseMapping: { [key in InteractionCategorie]: string } = {
      [InteractionCategorie.CONSOMMATION]: "📱 Consommation",
      [InteractionCategorie.ENERGIE]: "⚡️ Énergie",
      [InteractionCategorie.ALIMENTATION]: "🥦 Alimentation",
      [InteractionCategorie.GLOBAL]: "🌍 Global",
    };

    const typeInverseMapping: { [key in InteractionType]: string } = {
      [InteractionType.KYC]: "KYC",
      [InteractionType.QUIZ]: "QUIZ",
      [InteractionType.ARTICLE]: "ARTICLE",
      [InteractionType.SUIVIDUJOUR]: "SUIVI",
    };

    this._viewModels(
      interactions.map((interaction) => {
        return {
          titre: interaction.titre,
          sousTitre: interaction.sousTitre,
          categorie: categorieInverseMapping[interaction.categorie],
          nombreDePointsAGagner: interaction.nombreDePointsAGagner,
          miseEnAvant: interaction.miseEnAvant,
          type: typeInverseMapping[interaction.type],
          illustrationURL: interaction.illustrationURL,
          url: this.determineUrl(interaction),
          isUrlExterne: interaction.type === InteractionType.ARTICLE,
        };
      })
    );
  }

  private determineUrl(interaction: Interaction) {
    switch (interaction.type) {
      case InteractionType.QUIZ:
        return `/quiz/${interaction.id}`;
      case InteractionType.ARTICLE:
        return interaction.url;
      case InteractionType.KYC:
        return "";
      case InteractionType.SUIVIDUJOUR:
        return "/coach/suivi-du-jour";
    }
  }
}
