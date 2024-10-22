import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRechercheLongueVieAuxObjets.repository';
import { ServiceRechercheLongueVieAuxObjetsPresenterDetail } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRechercheLongueVieAuxObjetsDetail.presenter';

export interface ServiceRechercheLongueVieAuxObjetsResultatDetail {
  titre: string;
  image: string;
  adresse?: string;
  telephone?: string;
  heuresOuvertures?: string;
  siteWeb?: string;
  distance?: number;
  description?: string;
  position?: { latitude: number; longitude: number };
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
