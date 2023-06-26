import { InteractionsPresenter } from "@/interactions/ports/interactionsPresenter";
import { InteractionsRepository } from "@/interactions/ports/interactionsRepository";

export interface Interaction {
  type: string;
  titre: string;
  sousTitre: string;
  categorie: string;
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
