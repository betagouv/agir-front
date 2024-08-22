import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/ports/serviceRecherche.presenter';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';

export class RecupererServicesRecherchePageAccueilUsecase {
  constructor(private serviceRechercheRepository: ServiceRechercheRepository) {}

  async execute(idUtilisateur: string, serviceRecherchePresenter: ServiceRecherchePresenter) {
    const service = await this.serviceRechercheRepository.recupererServicesPageAccueil(idUtilisateur);
    serviceRecherchePresenter.presente(service);
  }
}
