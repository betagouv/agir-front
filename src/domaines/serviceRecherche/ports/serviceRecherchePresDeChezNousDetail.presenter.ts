import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/recupererDetailServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousPresenterDetail {
  presente(serviceRecherche: ServiceRecherchePresDeChezNousResultatDetail): void;
}
