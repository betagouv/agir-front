import { ServiceRechercheLongueVieAuxObjetsRepository } from '../../../../src/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';
import { ServiceRechercheLongueVieAuxObjets } from '../../../../src/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '../../../../src/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';

export class ServiceRechercheLongueVieAuxObjetsRepositoryEnErreur
  implements ServiceRechercheLongueVieAuxObjetsRepository
{
  recupererService(idUtilisateur: string, idService: string): Promise<ServiceRechercheLongueVieAuxObjets> {
    return Promise.resolve({
      titre: '',
      suggestions: [],
      favoris: [],
      categories: [],
      estEnErreur: true,
    } as ServiceRechercheLongueVieAuxObjets);
  }
  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRechercheLongueVieAuxObjetsResultatDetail> {
    throw new Error('Method not implemented.');
  }
}

export class ServiceRechercheLongueVieAuxObjetsRepositoryMock implements ServiceRechercheLongueVieAuxObjetsRepository {
  private constructor(
    private service: ServiceRechercheLongueVieAuxObjets | null,
    private detail: ServiceRechercheLongueVieAuxObjetsResultatDetail | null,
  ) {}

  public static recupererServiceMock(
    service: ServiceRechercheLongueVieAuxObjets,
  ): ServiceRechercheLongueVieAuxObjetsRepositoryMock {
    return new ServiceRechercheLongueVieAuxObjetsRepositoryMock(service, null);
  }

  public static recupererDetailMock(
    service: ServiceRechercheLongueVieAuxObjetsResultatDetail,
  ): ServiceRechercheLongueVieAuxObjetsRepositoryMock {
    return new ServiceRechercheLongueVieAuxObjetsRepositoryMock(null, service);
  }

  recupererService(_idUtilisateur: string, _idService: string): Promise<ServiceRechercheLongueVieAuxObjets> {
    return Promise.resolve(this.service!);
  }

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRechercheLongueVieAuxObjetsResultatDetail> {
    return Promise.resolve(this.detail!);
  }
}
