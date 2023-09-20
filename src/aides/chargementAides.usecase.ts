import { ChargementAidesRepository } from "@/aides/ports/chargementAides.repository";
import { ChargementAidesPresenter } from "@/aides/ports/chargementAides.presenter";

export interface Aides {
  id: string,
  titre: string,
  sousTitre: string,
  categorie: string,
  nombreDePointsAGagner: string,
  miseEnAvant: string,
  type: string,
  illustrationURL: string,
  url: string,
  isUrlExterne: boolean,
  duree: string,
  estBloquee: boolean,
  idDuContenu: string,
}

export default class ChargementAidesUsecase {
  constructor(private chargementAidesRepositoryRepository: ChargementAidesRepository) { }


  async execute(presenter: ChargementAidesPresenter) {
    const reponse = await this.chargementAidesRepositoryRepository.getAides();
    presenter.presente(reponse);
  }
}
