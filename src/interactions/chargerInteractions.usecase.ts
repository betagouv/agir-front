import { InteractionsPresenter } from "@/interactions/ports/interactionsPresenter";
import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";
export enum InteractionCategorie {
  ENERGIE = "Energie",
  CONSOMMATION = "Consommation",
  ALIMENTATION = "Nourriture",
  GLOBAL = "Global",
}
export enum InteractionType {
  QUIZ = "quizz",
  ARTICLE = "article",
  KYC = "KYC",
  SUIVIDUJOUR = "suivi-du-jour",
}
export interface Interaction {
  id: string;
  type: InteractionType;
  titre: string;
  sousTitre: string;
  categorie: InteractionCategorie;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
  illustrationURL: string;
  url: string;
  aEteFaite: boolean;
  idDuContenu: string;
}

export class ChargerInteractionsUsecase {
  private _interactionsRepository: InteractionsRepository;

  constructor(interactionsRepository: InteractionsRepository) {
    this._interactionsRepository = interactionsRepository;
  }

  async execute(idUtilisateur: string, presenter: InteractionsPresenter): Promise<void> {
    const interactions = await this._interactionsRepository.chargerInteractions(idUtilisateur);
    presenter.presente(interactions);
  }
}
