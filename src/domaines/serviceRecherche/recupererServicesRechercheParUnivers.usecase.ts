import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/ports/serviceRecherche.presenter';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';

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

export class RecupererServicesRechercheParUniversUsecase {
  constructor(private serviceRechercheRepository: ServiceRechercheRepository) {}

  async execute(idUtilisateur: string, univers: string, serviceRecherchePresenter: ServiceRecherchePresenter) {
    const service = await this.serviceRechercheRepository.recupererServicesParUnivers(idUtilisateur, univers);
    serviceRecherchePresenter.presente(service);
  }
}
