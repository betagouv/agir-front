import { AsideServiceViewModel } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';
import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceFruitsEtLegumesViewModel {
  peuConsommateurs: string[];
  moyennementConsommateurs: string[];
  tresConsommateurs: string[];
  aside: AsideServiceViewModel;
}

export class ServiceRechercheFruitsEtLegumesPresenterImpl implements ServiceRechercheFruitsEtLegumesPresenter {
  constructor(private serviceFruitsEtLegumesViewModel: (viewModel: ServiceFruitsEtLegumesViewModel) => void) {}

  presente(serviceRechercheFruitsEtLegumes: ServiceRechercheFruitsEtLegumes[]): void {
    this.serviceFruitsEtLegumesViewModel({
      peuConsommateurs: serviceRechercheFruitsEtLegumes
        .filter(elem => elem.impactCarboneKg < 1)
        .map(elem => elem.titre),
      moyennementConsommateurs: serviceRechercheFruitsEtLegumes
        .filter(elem => elem.impactCarboneKg >= 1 && elem.impactCarboneKg < 5)
        .map(elem => elem.titre),
      tresConsommateurs: serviceRechercheFruitsEtLegumes
        .filter(elem => elem.impactCarboneKg >= 5)
        .map(elem => elem.titre),
      aside: {
        nom: 'Impact CO₂',
        description: 'Des informations fiables et sourcées issues des données environnementales de l’ADEME',
        url: 'https://impactco2.fr/',
        logo: '',
        screenshot: '',
      },
    });
  }
}
