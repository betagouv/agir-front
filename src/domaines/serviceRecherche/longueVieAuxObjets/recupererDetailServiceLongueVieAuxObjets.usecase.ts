import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';
import { ServiceRechercheLongueVieAuxObjetsPresenterDetail } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjetsDetail.presenter';

export interface ServiceRechercheLongueVieAuxObjetsResultatDetail {
  titre: string;
  adresse?: string;
  distance?: number;
  position?: { latitude: number; longitude: number };
  sources?: string[];
}

export class RecupererDetailServiceLongueVieAuxObjetsUsecase {
  constructor(private readonly repository: ServiceRechercheLongueVieAuxObjetsRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    presenter: ServiceRechercheLongueVieAuxObjetsPresenterDetail,
  ) {
    const detail = await this.repository.recupererDetail(idUtilisateur, idService);
    presenter.presente(detail);
  }
}
