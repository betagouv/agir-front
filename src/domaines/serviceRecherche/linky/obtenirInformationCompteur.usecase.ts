import { ServiceRechercheLinkyPresenter } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.presenter';
import { ServiceRechercheLinkyRepository } from '@/domaines/serviceRecherche/linky/ports/serviceRechercheLinky.repository';

export interface InformationCompteur {
  prm: string;
  estConfigure: boolean;
  estActif: boolean;
  estFonctionnel: boolean;
  configurationEnErreur: boolean;
}

export class ObtenirInformationCompteurUsecase {
  constructor(private serviceRechercheLinkyRepository: ServiceRechercheLinkyRepository) {}

  async execute(idUtilsateur: string, presenter: ServiceRechercheLinkyPresenter) {
    const reponse = await this.serviceRechercheLinkyRepository.recupererInformationCompteur(idUtilsateur);
    presenter.presente(reponse);
  }
}
