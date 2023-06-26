import { Interaction } from "@/interactions/chargerInteractions.usecase";
import { InteractionsPresenter } from "@/interactions/ports/interactionsPresenter";

export interface InteractionViewModel {
  titre: string;
  sousTitre: string;
  categorie: string;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
  type: string;
}
export class InteractionsPresenterImpl implements InteractionsPresenter {
  private _viewModels: (interactionViewModels: InteractionViewModel[]) => void;
  constructor(viewModels: (interactionViewModels: InteractionViewModel[]) => void) {
    this._viewModels = viewModels;
  }

  presente(interactions: Interaction[]) {
    this._viewModels(
      interactions.map((interaction) => {
        return {
          titre: interaction.titre,
          sousTitre: interaction.sousTitre,
          categorie: interaction.categorie,
          nombreDePointsAGagner: interaction.nombreDePointsAGagner,
          miseEnAvant: interaction.miseEnAvant,
          type: interaction.type,
        };
      })
    );
  }
}
