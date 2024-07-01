import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';
import { ServiceRecherche } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';

export class ServiceRechercheRepositoryMock implements ServiceRechercheRepository {
  constructor(private serviceRechercheARetourner: ServiceRecherche) {}

  recupererService(_idUtilisateur: string, _idService: string): Promise<ServiceRecherche> {
    return Promise.resolve(this.serviceRechercheARetourner);
  }
}
