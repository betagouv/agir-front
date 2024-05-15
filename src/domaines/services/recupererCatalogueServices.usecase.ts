import { ServiceRepository } from '@/domaines/services/ports/service.repository';
import { ServiceCataloguePresenter } from '@/domaines/services/ports/serviceCatalogue.presenter';
export interface ServiceCatalogue {
  id: string;
  icon: string;
  titre: string;
  description: string;
  sousDescription: string;
  estInstalle: boolean;
  nombreInstallation: number;
  thematiques: string[];
  image: string;
  estEnConstruction: boolean;
  parametrageRequis: boolean;
}
export class RecupererCatalogueServicesUseCase {
  constructor(private serviceRepository: ServiceRepository) {}
  async execute(utilisateurId: string, presenter: ServiceCataloguePresenter): Promise<void> {
    const services = await this.serviceRepository.recupererCatalogueServices(utilisateurId);
    presenter.present(services);
  }
}
