import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';

export interface ServiceRechercheLongueVieAuxObjetsPresenterDetail {
  presente(serviceRecherche: ServiceRechercheLongueVieAuxObjetsResultatDetail): void;
}
