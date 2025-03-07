import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import { ServiceRechercheLongueVieAuxObjets } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';

export interface ServiceRechercheLongueVieAuxObjetsRepository {
  recupererService(
    idUtilisateur: string,
    categorie: string,
    nombreMaxResultats: number,
  ): Promise<ServiceRechercheLongueVieAuxObjets>;

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRechercheLongueVieAuxObjetsResultatDetail>;
}
