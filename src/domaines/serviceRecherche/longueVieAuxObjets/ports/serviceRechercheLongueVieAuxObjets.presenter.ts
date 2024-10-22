import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';

export interface ServiceRechercheLongueVieAuxObjetsPresenter {
  presente(serviceRecherche: ServiceRecherchePresDeChezNous): void;
  presenteErreur(): void;
}
