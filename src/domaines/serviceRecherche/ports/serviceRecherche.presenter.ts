import { ServiceRecherche } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';

export interface ServiceRecherchePresenter {
  presente(serviceRecherche: ServiceRecherche): void;
}
