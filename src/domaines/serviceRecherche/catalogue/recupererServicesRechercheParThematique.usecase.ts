import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/catalogue/ports/serviceRecherche.presenter';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/catalogue/ports/serviceRecherche.repository';

interface ServiceRecherche {
  id: string;
  titre: string;
  sous_titre: string;
  externalUrl: string;
  iconUrl: string;
  estServiceExterne: boolean;
}

export interface ServicesRecherche {
  services: ServiceRecherche[];
}

export class RecupererServicesRechercheParThematiqueUsecase {
  constructor(private serviceRechercheRepository: ServiceRechercheRepository) {}

  async execute(idUtilisateur: string, thematiqueId: string, serviceRecherchePresenter: ServiceRecherchePresenter) {
    const service = await this.serviceRechercheRepository.recupererServicesParThematique(idUtilisateur, thematiqueId);
    serviceRecherchePresenter.presente(service);
  }
}
