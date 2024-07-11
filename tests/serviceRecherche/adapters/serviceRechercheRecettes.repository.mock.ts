import { ServiceRechercheRecettesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheRecettes.repository';
import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recupererServiceRecettes.usecase';

export class ServiceRechercheRecettesMock implements ServiceRechercheRecettesRepository {
  constructor(private serviceRechercheARetourner: ServiceRechercheRecettes) {}

  recupererService(_idUtilisateur: string, _idService: string): Promise<ServiceRechercheRecettes> {
    return Promise.resolve(this.serviceRechercheARetourner);
  }
}
