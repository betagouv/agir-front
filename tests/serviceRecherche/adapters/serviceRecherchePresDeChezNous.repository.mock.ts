import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';
import { ServiceRecherchePresDeChezNousResultatDetail } from '@/domaines/serviceRecherche/recupererDetailServicePresDeChezNous.usecase';

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
