import { Service } from '@/domaines/services/installerServiceActif.usecase';
import { ServiceRepository } from '@/domaines/services/ports/service.repository';
import { ServiceCatalogue } from '@/domaines/services/recupererCatalogueServices.usecase';

export class MockRecupererCatalogueServiceRepository implements ServiceRepository {
  constructor(private catalogueServicesARetourner: ServiceCatalogue[]) {}

  recupererCatalogueServices(_utilisateurId: string): Promise<ServiceCatalogue[]> {
    return Promise.resolve(this.catalogueServicesARetourner);
  }

  parametrerService(utilisateurId: string, serviceId: string, parametres: { [key: string]: string }): Promise<void> {
    throw Error;
  }

  recupererServicesActifs(_utilisateurId: string): Promise<Service[]> {
    throw Error;
  }

  enleverServiceActif(_utilisateurId, _serviceId): Promise<void> {
    throw Error;
  }

  installerServiceActif(_utilisateurId, _serviceId): Promise<void> {
    throw Error;
  }
}
