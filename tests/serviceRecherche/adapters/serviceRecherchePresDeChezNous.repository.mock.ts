import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

export class ServiceRecherchePresDeChezNousRepositoryMock implements ServiceRecherchePresDeChezNousRepository {
  constructor(private serviceRechercheARetourner: ServiceRecherchePresDeChezNous) {}

  recupererService(_idUtilisateur: string, _idService: string): Promise<ServiceRecherchePresDeChezNous> {
    return Promise.resolve(this.serviceRechercheARetourner);
  }
}
