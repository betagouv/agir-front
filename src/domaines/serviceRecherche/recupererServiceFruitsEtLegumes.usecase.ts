import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.repository';

export interface ServiceRechercheFruitsEtLegumes {
  titre: string;
  impactCarboneKg: number;
}

export class RecupererServiceFruitsEtLegumesUsecase {
  constructor(private serviceRechercheRepository: ServiceRechercheFruitsEtLegumesRepository) {}

  async execute(
    idUtilisateur: string,
    mois: string,
    recupererServiceRecherchePresenter: ServiceRechercheFruitsEtLegumesPresenter,
  ) {
    const service = await this.serviceRechercheRepository.recupererService(idUtilisateur, mois);
    recupererServiceRecherchePresenter.presente(service);
  }
}
