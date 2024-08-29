import { ServiceRechercheRepository } from '../../../../src/domaines/serviceRecherche/catalogue/ports/serviceRecherche.repository';
import { ServicesRecherche } from '../../../../src/domaines/serviceRecherche/catalogue/recupererServicesRechercheParUnivers.usecase';

export class ServiceRechercheRepositoryMock implements ServiceRechercheRepository {
  constructor(private servicesRechercheARetourner: ServicesRecherche) {}

  recupererServicesParUnivers(_idUtilisateur: string): Promise<ServicesRecherche> {
    return Promise.resolve(this.servicesRechercheARetourner);
  }

  recupererServicesPageAccueil(idUtilisateur: string): Promise<ServicesRecherche> {
    return Promise.resolve(this.servicesRechercheARetourner);
  }
}
