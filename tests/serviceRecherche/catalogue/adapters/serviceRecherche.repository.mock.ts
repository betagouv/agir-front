import { ServiceRechercheRepository } from '../../../../src/domaines/serviceRecherche/catalogue/ports/serviceRecherche.repository';
import { ServicesRecherche } from '../../../../src/domaines/serviceRecherche/catalogue/recupererServicesRechercheParThematique.usecase';

export class ServiceRechercheRepositoryMock implements ServiceRechercheRepository {
  constructor(private servicesRechercheARetourner: ServicesRecherche) {}

  recupererServicesParThematique(_idUtilisateur: string, _thematiqueId: string): Promise<ServicesRecherche> {
    return Promise.resolve(this.servicesRechercheARetourner);
  }

  recupererServicesPageAccueil(_idUtilisateur: string): Promise<ServicesRecherche> {
    return Promise.resolve(this.servicesRechercheARetourner);
  }
}
