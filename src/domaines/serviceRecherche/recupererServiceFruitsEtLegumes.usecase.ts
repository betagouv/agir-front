import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumesRepository } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.repository';
import { ServiceRechercheBase } from '@/domaines/serviceRecherche/serviceRecherche';

export interface ServiceRechercheFruitsEtLegumes extends ServiceRechercheBase {
  listeFruitsEtLegumes: {
    titre: string;
    impactCarboneKg: number;
    urlImage: string;
    type: 'legume' | 'fruit' | 'fruit_et_legume';
  }[];
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
