import { ServiceRechercheRecettesRepository } from '../../../../src/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.repository';
import { ServiceRechercheRecettes } from '../../../../src/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';

export class ServiceRechercheRecettesMock implements ServiceRechercheRecettesRepository {
  constructor(private serviceRechercheARetourner: ServiceRechercheRecettes) {}

  recupererService(_idUtilisateur: string, _idService: string): Promise<ServiceRechercheRecettes> {
    return Promise.resolve(this.serviceRechercheARetourner);
  }
}
