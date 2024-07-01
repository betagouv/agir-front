import { ServiceRecherche } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';

export interface ServiceRechercheRepository {
  recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherche>;
}
