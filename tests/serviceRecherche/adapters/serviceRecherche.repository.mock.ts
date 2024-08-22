import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';
import { ServicesRecherche } from '@/domaines/serviceRecherche/recupererServicesRechercheParUnivers.usecase';

export class ServiceRechercheRepositoryMock implements ServiceRechercheRepository {
  constructor(private servicesRechercheARetourner: ServicesRecherche) {}

  recupererServicesParUnivers(_idUtilisateur: string): Promise<ServicesRecherche> {
    return Promise.resolve(this.servicesRechercheARetourner);
  }

  recupererServicesPageAccueil(idUtilisateur: string): Promise<ServicesRecherche> {
    return Promise.resolve(this.servicesRechercheARetourner);
  }
}
