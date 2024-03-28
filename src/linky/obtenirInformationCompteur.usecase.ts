import { LinkyInformationPresenter } from '@/linky/ports/linky.information.presenter';
import { LinkyRepository } from '@/linky/ports/linkyRepository.repository';

export interface InformationCompteur {
  prm: string;
  estConfigure: boolean;
  estActif: boolean;
  estFonctionnel: boolean;
  configurationEnErreur: boolean;
}

export class ObtenirInformationCompteurUsecase {
  constructor(private linkyRepository: LinkyRepository) {}

  async execute(idUtilsateur: string, presenter: LinkyInformationPresenter) {
    const reponse = await this.linkyRepository.recupererInformationCompteur(idUtilsateur);
    presenter.presente(reponse);
  }
}
