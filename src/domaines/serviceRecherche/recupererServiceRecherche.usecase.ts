import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/ports/serviceRecherche.presenter';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';

interface ServiceRechercheResultat {
  titre: string;
  adresse?: string;
  nombreMiseEnFavoris: number;
}

interface ServiceRechercheCategorie {
  code: string;
  label: string;
  estLaCategorieParDefaut: boolean;
}
export interface ServiceRecherche {
  titre: string;
  suggestions: ServiceRechercheResultat[];
  favoris: ServiceRechercheResultat[];
  categories: ServiceRechercheCategorie[];
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
