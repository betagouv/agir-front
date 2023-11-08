import { ServiceCataloguePresenter } from '@/services/ports/serviceCatalogue.presenter';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';

export interface ServiceCatalogueViewModel {
  id: string;
  icon: string;
  titre: string;
  description: string;
  sousDescription: string;
  estInstalle: boolean;
  nombreInstallation: string;
  thematiques: string[];
}
export class ServiceCataloguePresenterImpl implements ServiceCataloguePresenter {
  constructor(private serviceCatelogueViewModels: (services: ServiceCatalogueViewModel[]) => void) {}

  present(services: ServiceCatalogue[]): void {
    this.serviceCatelogueViewModels(
      services.map(service => ({
        id: service.id,
        icon: service.icon,
        titre: service.titre,
        description: service.description,
        sousDescription: service.sousDescription,
        estInstalle: service.estInstalle,
        nombreInstallation: ` ${service.nombreInstallation} ont installé ce service`,
        thematiques: service.thematiques,
      }))
    );
  }
}
