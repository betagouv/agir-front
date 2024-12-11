import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousRepository {
  recupererService(
    idUtilisateur: string,
    idService: string,
    nombreMaxResultats: number,
  ): Promise<ServiceRecherchePresDeChezNous>;

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNousResultatDetail>;
}
