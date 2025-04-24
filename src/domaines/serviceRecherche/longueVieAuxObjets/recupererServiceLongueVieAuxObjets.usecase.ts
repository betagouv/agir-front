import { ServiceRechercheBase } from '@/domaines/serviceRecherche/catalogue/serviceRecherche';
import { ServiceRechercheLongueVieAuxObjetsPresenter } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.presenter';
import { ServiceRechercheLongueVieAuxObjetsRepository } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.repository';
import { Coordonnees } from '@/shell/coordonneesType';

export interface ServiceRechercheLongueVieAuxObjetsResultat {
  id: string;
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
  image: string;
  distance?: number;
  categories?: string[];
}

export interface ServiceRechercheLongueVieAuxObjets extends ServiceRechercheBase {
  titre: string;
  suggestions: ServiceRechercheLongueVieAuxObjetsResultat[];
  favoris?: ServiceRechercheLongueVieAuxObjetsResultat[];
  estEnErreur: boolean;
  plusDeResultatsDisponibles: boolean;
  nombreMaxResultats: number;
}

export class RecupererServiceLongueVieAuxObjetsUsecase {
  constructor(private serviceRechercheLongueVieAuxObjetsRepository: ServiceRechercheLongueVieAuxObjetsRepository) {}

  async execute(
    idUtilisateur: string,
    categorie: string,
    nombreMaxResultats: number,
    recupererServiceRechercheLongueVieAuxObjetsPresenter: ServiceRechercheLongueVieAuxObjetsPresenter,
    coordonnees?: Coordonnees,
  ) {
    const service = await this.serviceRechercheLongueVieAuxObjetsRepository.recupererService(
      idUtilisateur,
      categorie,
      nombreMaxResultats,
      coordonnees,
    );
    if (service.estEnErreur) {
      recupererServiceRechercheLongueVieAuxObjetsPresenter.presenteErreur();
    } else {
      recupererServiceRechercheLongueVieAuxObjetsPresenter.presente(service);
    }
  }
}
