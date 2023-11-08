import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';

export interface ServiceCataloguePresenter {
  present(services: ServiceCatalogue[]): void;
}
