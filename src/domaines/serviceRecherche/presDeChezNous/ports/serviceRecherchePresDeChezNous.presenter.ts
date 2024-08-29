import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousPresenter {
  presente(serviceRecherche: ServiceRecherchePresDeChezNous): void;
}
