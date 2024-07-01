import { ServiceRecherchePresenter } from '@/domaines/serviceRecherche/ports/serviceRecherche.presenter';
import { ServiceRechercheRepository } from '@/domaines/serviceRecherche/ports/serviceRecherche.repository';

export interface ServiceRecherche {
  titre: string;
  suggestions: { titre: string; adresse?: string; nombreMiseEnFavoris: number }[];
}

export class RecupererServiceRechercheUsecase {
  constructor(private serviceRechercheRepository: ServiceRechercheRepository) {}

  async execute(
    idUtilisateur: string,
    idService: string,
    recupererServiceRecherchePresenter: ServiceRecherchePresenter,
  ) {
    const service = await this.serviceRechercheRepository.getService(idUtilisateur, idService);
    recupererServiceRecherchePresenter.presente(service);
  }
}
