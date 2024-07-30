import { ServicesRecherche } from '@/domaines/serviceRecherche/recupererServicesRechercheParUnivers.usecase';

export interface ServiceRecherchePresenter {
  presente(serviceRecherche: ServicesRecherche): void;
}
