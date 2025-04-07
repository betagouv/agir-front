import { ServiceRechercheBase } from '@/domaines/serviceRecherche/catalogue/serviceRecherche';
import { ServiceRecherchePresDeChezNousPresenter } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.presenter';
import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.repository';
import { Coordonnees } from '@/shell/coordonneesType';

interface ServiceRecherchePresDeChezNousResultat {
  id: string;
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
  image: string;
  distance?: number;
}

export interface ServiceRecherchePresDeChezNous extends ServiceRechercheBase {
  titre: string;
  suggestions: ServiceRecherchePresDeChezNousResultat[];
  favoris?: ServiceRecherchePresDeChezNousResultat[];
  estEnErreur: boolean;
  plusDeResultatsDisponibles: boolean;
}

export class RecupererServicePresDeChezNousUsecase {
  constructor(private serviceRecherchePresDeChezNousRepository: ServiceRecherchePresDeChezNousRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    nombreMaxResultats: number,
    recupererServiceRecherchePresDeChezNousPresenter: ServiceRecherchePresDeChezNousPresenter,
    coordonnees?: Coordonnees,
  ) {
    const service = await this.serviceRecherchePresDeChezNousRepository.recupererService(
      idUtilisateur,
      idService,
      nombreMaxResultats,
      coordonnees,
    );
    if (service.estEnErreur) {
      recupererServiceRecherchePresDeChezNousPresenter.presenteErreur();
    } else {
      recupererServiceRecherchePresDeChezNousPresenter.presente(service);
    }
  }
}
