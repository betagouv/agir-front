import { ServicesRecherche } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParThematique.usecase';

export interface ServiceRecherchePresenter {
  presente(serviceRecherche: ServicesRecherche): void;
}
