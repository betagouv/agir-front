import { ServiceCataloguePresenter } from '@/services/ports/serviceCatalogue.presenter';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';

export interface ServiceCatalogueViewModel {
  catalogue: ServiceCatalogueViewModelItem[];
  filtreThematiques: {
    id: string;
    label: string;
    checked: boolean;
  }[];
}
export interface ServiceCatalogueViewModelItem {
  id: string;
  icon: string;
  titre: string;
  description: string;
  sousDescription: string;
  estInstalle: boolean;
  nombreInstallation: string;
  thematiques: string[];
  image: string;
  estEnConstruction: boolean;
  parametrageRequis: boolean;
  ancre: string;
}
export class ServiceCataloguePresenterImpl implements ServiceCataloguePresenter {
  constructor(private serviceCatelogueViewModels: (services: ServiceCatalogueViewModel) => void) {}

  present(services: ServiceCatalogue[]): void {
    this.serviceCatelogueViewModels({
      catalogue: services.map(service => ({
        id: service.id,
        icon: service.icon,
        titre: service.titre,
        description: service.description,
        sousDescription: service.sousDescription,
        estInstalle: service.estInstalle,
        nombreInstallation: ` ${service.nombreInstallation} ont installé ce service`,
        thematiques: service.thematiques,
        image: service.image,
        estEnConstruction: service.estEnConstruction,
        parametrageRequis: service.parametrageRequis,
        ancre: service.id,
      })),
      filtreThematiques: this.recupererLesThematiquesDeFaconUnique(services),
    });
  }

  private recupererLesThematiquesDeFaconUnique(services: ServiceCatalogue[]) {
    return services
      .map(service => service.thematiques)
      .flat()
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()
      .map(serviceFiltrer => ({
        id: serviceFiltrer,
        label: serviceFiltrer,
        checked: false,
      }));
  }
}
