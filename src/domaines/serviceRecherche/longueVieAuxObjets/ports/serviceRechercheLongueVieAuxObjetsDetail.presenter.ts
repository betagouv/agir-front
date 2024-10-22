import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/presDeChezNous/recupererDetailServiceLongueVieAuxObjets.usecase';

export interface ServiceRechercheLongueVieAuxObjetsPresenterDetail {
  presente(serviceRecherche: ServiceRechercheLongueVieAuxObjetsResultatDetail): void;
}
