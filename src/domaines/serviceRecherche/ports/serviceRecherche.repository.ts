import { ServiceRecherche } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';

export interface ServiceRechercheRepository {
  getService(idUtilisateur: string, idService: string): Promise<ServiceRecherche>;
}
