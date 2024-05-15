import { ServiceCatalogue } from '@/domaines/services/recupererCatalogueServices.usecase';

export interface ServiceCataloguePresenter {
  present(services: ServiceCatalogue[]): void;
}
