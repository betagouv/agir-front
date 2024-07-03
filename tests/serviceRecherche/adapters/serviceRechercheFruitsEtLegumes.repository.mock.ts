import { ServiceRechercheFruitsEtLegumesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.repository';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

export class ServiceRechercheFruitsEtLegumesRepositoryMock implements ServiceRechercheFruitsEtLegumesRepository {
  constructor(private serviceRechercheARetourner: ServiceRechercheFruitsEtLegumes) {}

  recupererService(_idUtilisateur: string): Promise<ServiceRechercheFruitsEtLegumes> {
    return Promise.resolve(this.serviceRechercheARetourner);
  }
}
