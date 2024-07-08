import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousPresenter {
  presente(serviceRecherche: ServiceRecherchePresDeChezNous): void;
}
