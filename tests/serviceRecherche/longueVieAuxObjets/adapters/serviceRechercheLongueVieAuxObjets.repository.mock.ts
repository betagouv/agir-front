import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';
import { ServiceRechercheLongueVieAuxObjets } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
import { ServiceRechercheLongueVieAuxObjetsResultatDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export class ServiceRechercheLongueVieAuxObjetsRepositoryEnErreur
  implements ServiceRechercheLongueVieAuxObjetsRepository
{
  recupererService(
    idUtilisateur: string,
    typeRecherche: {
      categorie: string;
      sous_catagorie?: string;
    },
    nombreMaxResultats: number,
    coordonnees?: Coordonnees,
  ): Promise<ServiceRechercheLongueVieAuxObjets> {
    return Promise.resolve({
      titre: '',
      suggestions: [],
      estEnErreur: true,
      plusDeResultatsDisponibles: false,
      nombreMaxResultats: nombreMaxResultats,
      categories: [],
    });
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

  recupererService(
    idUtilisateur: string,
    typeRecherche: { categorie: string; sousCategorie?: string },
    nombreMaxResultats: number,
  ): Promise<ServiceRechercheLongueVieAuxObjets> {
    return Promise.resolve(this.service!);
  }

  recupererDetail(idUtilisateur: string, idService: string): Promise<ServiceRechercheLongueVieAuxObjetsResultatDetail> {
    return Promise.resolve(this.detail!);
  }
}
