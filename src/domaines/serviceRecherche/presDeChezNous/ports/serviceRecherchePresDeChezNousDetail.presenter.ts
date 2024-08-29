import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousPresenterDetail {
  presente(serviceRecherche: ServiceRecherchePresDeChezNousResultatDetail): void;
}
