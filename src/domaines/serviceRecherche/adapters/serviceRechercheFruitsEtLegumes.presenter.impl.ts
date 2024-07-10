import { ServiceRechercheViewModelBase } from './serviceRechercheViewModel';
import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceFruitsEtLegumesViewModel extends ServiceRechercheViewModelBase {
  peuConsommateurs: string[];
  moyennementConsommateurs: string[];
  tresConsommateurs: string[];
}

export class ServiceRechercheFruitsEtLegumesPresenterImpl implements ServiceRechercheFruitsEtLegumesPresenter {
  constructor(private serviceFruitsEtLegumesViewModel: (viewModel: ServiceFruitsEtLegumesViewModel) => void) {}

  presente(serviceRechercheFruitsEtLegumes: ServiceRechercheFruitsEtLegumes): void {
    this.serviceFruitsEtLegumesViewModel({
      peuConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
        .filter(elem => elem.impactCarboneKg < 1)
        .map(elem => elem.titre)
        .sort(),
      moyennementConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
        .filter(elem => elem.impactCarboneKg >= 1 && elem.impactCarboneKg < 5)
        .map(elem => elem.titre)
        .sort(),
      tresConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
        .filter(elem => elem.impactCarboneKg >= 5)
        .map(elem => elem.titre)
        .sort(),
      aside: {
        nom: 'Impact CO₂',
        description: 'Des informations fiables et sourcées issues des données environnementales de l’ADEME',
        url: 'https://impactco2.fr/',
        logo: '/service-fruits-logo.png',
        screenshot: '/service-fruits.jpg',
      },
      categories: serviceRechercheFruitsEtLegumes.categories.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.estLaCategorieParDefaut,
      })),
    });
  }
}
