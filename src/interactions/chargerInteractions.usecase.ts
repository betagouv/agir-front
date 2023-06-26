import { InteractionsPresenter } from "@/interactions/ports/interactionsPresenter";
import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";
export enum InteractionCategorie {
  ENERGIE = "Energie",
  CONSOMMATION = "Consommation",
  ALIMENTATION = "Alimentation",
}
export enum InteractionType {
  QUIZ = "Quiz",
  VIDEO = "Video",
  KYC = "Kyc",
}
export interface Interaction {
  type: InteractionType;
  titre: string;
  sousTitre: string;
  categorie: InteractionCategorie;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
}

export class ChargerInteractionsUsecase {
  private _interactionsRepository: InteractionsRepository;

  constructor(interactionsRepository: InteractionsRepository) {
    this._interactionsRepository = interactionsRepository;
  }

  execute(nomUtilisateur: string, presenter: InteractionsPresenter): Promise<void> {
    const interactions = this._interactionsRepository.chargerInteractions(nomUtilisateur);
    presenter.presente(interactions);
    return Promise.resolve();
  }
}
