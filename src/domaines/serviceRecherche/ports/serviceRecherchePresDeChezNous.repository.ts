import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

export interface ServiceRecherchePresDeChezNousRepository {
  recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNous>;
}
