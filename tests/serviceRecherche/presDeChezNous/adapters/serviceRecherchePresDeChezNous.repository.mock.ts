import { ServiceRecherchePresDeChezNousRepository } from '../../../../src/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRecherchePresDeChezNous } from '../../../../src/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
import { ServiceRecherchePresDeChezNousResultatDetail } from '../../../../src/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';

export class ServiceRecherchePresDeChezNousRepositoryEnErreur implements ServiceRecherchePresDeChezNousRepository {
  recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNous> {
    return Promise.resolve({
      titre: '',
      suggestions: [],
      estEnErreur: true,
    });
  }
  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNousResultatDetail> {
    return Promise.resolve(this.detail!);
  }
}

export class ServiceRecherchePresDeChezNousRepositoryMock implements ServiceRecherchePresDeChezNousRepository {
  private constructor(
    private service: ServiceRecherchePresDeChezNous | null,
    private detail: ServiceRecherchePresDeChezNousResultatDetail | null,
  ) {}

  public static recupererServiceMock(
    service: ServiceRecherchePresDeChezNous,
  ): ServiceRecherchePresDeChezNousRepositoryMock {
    return new ServiceRecherchePresDeChezNousRepositoryMock(service, null);
  }

  public static recupererDetailMock(
    service: ServiceRecherchePresDeChezNousResultatDetail,
  ): ServiceRecherchePresDeChezNousRepositoryMock {
    return new ServiceRecherchePresDeChezNousRepositoryMock(null, service);
  }

  recupererService(_idUtilisateur: string, _idService: string): Promise<ServiceRecherchePresDeChezNous> {
    return Promise.resolve(this.service!);
  }

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNousResultatDetail> {
    return Promise.resolve(this.detail!);
  }
}
