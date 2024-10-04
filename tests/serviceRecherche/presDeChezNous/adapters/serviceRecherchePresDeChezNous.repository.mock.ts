import { ServiceRecherchePresDeChezNousRepository } from '../../../../src/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRecherchePresDeChezNous } from '../../../../src/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
import { ServiceRecherchePresDeChezNousResultatDetail } from '../../../../src/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';

export class ServiceRecherchePresDeChezNousRepositoryEnErreur implements ServiceRecherchePresDeChezNousRepository {
  recupererService(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNous> {
    return Promise.resolve({
      titre: '',
      suggestions: [],
      favoris: [],
      categories: [],
      estEnErreur: true,
    } as ServiceRecherchePresDeChezNous);
  }
  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRecherchePresDeChezNousResultatDetail> {
    throw new Error('Method not implemented.');
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
