import { ServicesRecherche } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParUnivers.usecase';

export interface ServiceRecherchePresenter {
  presente(serviceRecherche: ServicesRecherche): void;
}
