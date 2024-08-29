import { ServiceRechercheFruitsEtLegumesRepository } from '../../../../src/domaines/serviceRecherche/fruitsEtLegumes/ports/serviceRechercheFruitsEtLegumes.repository';
import { ServiceRechercheFruitsEtLegumes } from '../../../../src/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';

export class ServiceRechercheFruitsEtLegumesRepositoryMock implements ServiceRechercheFruitsEtLegumesRepository {
  constructor(private serviceRechercheARetourner: ServiceRechercheFruitsEtLegumes) {}

  recupererService(_idUtilisateur: string): Promise<ServiceRechercheFruitsEtLegumes> {
    return Promise.resolve(this.serviceRechercheARetourner);
  }
}
