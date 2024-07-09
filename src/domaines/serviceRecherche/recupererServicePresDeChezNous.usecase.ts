import { ServiceRecherchePresDeChezNousPresenter } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.presenter';
import { ServiceRecherchePresDeChezNousRepository } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.repository';
import { ServiceRechercheBase } from '@/domaines/serviceRecherche/serviceRecherche';

interface ServiceRecherchePresDeChezNousResultat {
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
  distance?: number;
}

export interface ServiceRecherchePresDeChezNous extends ServiceRechercheBase {
  titre: string;
  suggestions: ServiceRecherchePresDeChezNousResultat[];
  favoris: ServiceRecherchePresDeChezNousResultat[];
}

export class RecupererServicePresDeChezNousUsecase {
  constructor(private serviceRecherchePresDeChezNousRepository: ServiceRecherchePresDeChezNousRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    recupererServiceRecherchePresDeChezNousPresenter: ServiceRecherchePresDeChezNousPresenter,
  ) {
    const service = await this.serviceRecherchePresDeChezNousRepository.recupererService(idUtilisateur, idService);
    recupererServiceRecherchePresDeChezNousPresenter.presente(service);
  }
}
