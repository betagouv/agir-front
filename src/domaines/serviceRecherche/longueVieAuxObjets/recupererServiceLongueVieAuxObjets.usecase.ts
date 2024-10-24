import { ServiceRechercheBase } from '@/domaines/serviceRecherche/catalogue/serviceRecherche';
import { ServiceRechercheLongueVieAuxObjetsPresenter } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.presenter';
import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';

interface ServiceRechercheLongueVieAuxObjetsResultat {
  id: string;
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
  image: string;
  distance?: number;
}

export interface ServiceRechercheLongueVieAuxObjets extends ServiceRechercheBase {
  titre: string;
  suggestions: ServiceRechercheLongueVieAuxObjetsResultat[];
  favoris?: ServiceRechercheLongueVieAuxObjetsResultat[];
  estEnErreur: boolean;
}

export class RecupererServiceLongueVieAuxObjetsUsecase {
  constructor(private serviceRechercheLongueVieAuxObjetsRepository: ServiceRechercheLongueVieAuxObjetsRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    recupererServiceRechercheLongueVieAuxObjetsPresenter: ServiceRechercheLongueVieAuxObjetsPresenter,
  ) {
    const service = await this.serviceRechercheLongueVieAuxObjetsRepository.recupererService(idUtilisateur, idService);
    if (service.estEnErreur) {
      recupererServiceRechercheLongueVieAuxObjetsPresenter.presenteErreur();
    } else {
      recupererServiceRechercheLongueVieAuxObjetsPresenter.presente(service);
    }
  }
}
