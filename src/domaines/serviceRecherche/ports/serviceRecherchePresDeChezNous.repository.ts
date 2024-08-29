import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/recupererDetailServicePresDeChezNous.usecase';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousRepository {
  recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNous>;
  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNousResultatDetail>;
}
