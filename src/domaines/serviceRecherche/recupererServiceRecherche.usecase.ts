import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/ports/serviceRecherche.presenter';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';
import { ServiceRechercheBase } from '@/domaines/serviceRecherche/serviceRecherche';

interface ServiceRechercheResultat {
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
}

export interface ServiceRecherche extends ServiceRechercheBase {
  titre: string;
  suggestions: ServiceRechercheResultat[];
  favoris: ServiceRechercheResultat[];
}

export class RecupererServiceRechercheUsecase {
  constructor(private serviceRechercheRepository: ServiceRechercheRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    recupererServiceRecherchePresenter: ServiceRecherchePresenter,
  ) {
    const service = await this.serviceRechercheRepository.recupererService(idUtilisateur, idService);
    recupererServiceRecherchePresenter.presente(service);
  }
}
