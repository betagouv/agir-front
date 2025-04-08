import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import { ServiceRechercheLongueVieAuxObjets } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export interface ServiceRechercheLongueVieAuxObjetsRepository {
  recupererService(
    idUtilisateur: string,
    categorie: string,
    nombreMaxResultats: number,
    coordonnees?: Coordonnees,
  ): Promise<ServiceRechercheLongueVieAuxObjets>;

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRechercheLongueVieAuxObjetsResultatDetail>;
}
