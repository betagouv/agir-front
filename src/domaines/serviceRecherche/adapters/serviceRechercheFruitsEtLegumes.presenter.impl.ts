import { ServiceRechercheViewModelBase } from './serviceRechercheViewModel';
import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceFruitsEtLegumesDetailViewModel {
  nom: string;
  emoji: string;
}

interface ServiceFruitsEtLegumesConsommationViewModel {
  peuConsommateurs: ServiceFruitsEtLegumesDetailViewModel[];
  moyennementConsommateurs: ServiceFruitsEtLegumesDetailViewModel[];
  tresConsommateurs: ServiceFruitsEtLegumesDetailViewModel[];
}

export interface ServiceFruitsEtLegumesViewModel extends ServiceRechercheViewModelBase {
  fruits: ServiceFruitsEtLegumesConsommationViewModel;
  legumes: ServiceFruitsEtLegumesConsommationViewModel;
}

export class ServiceRechercheFruitsEtLegumesPresenterImpl implements ServiceRechercheFruitsEtLegumesPresenter {
  constructor(private serviceFruitsEtLegumesViewModel: (viewModel: ServiceFruitsEtLegumesViewModel) => void) {}

  presente(serviceRechercheFruitsEtLegumes: ServiceRechercheFruitsEtLegumes): void {
    this.serviceFruitsEtLegumesViewModel({
      fruits: this.categoriserFruitEtLegume(serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes, 'fruit'),
      legumes: this.categoriserFruitEtLegume(serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes, 'legume'),
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

  private categoriserFruitEtLegume(
    items: ServiceRechercheFruitsEtLegumes['listeFruitsEtLegumes'],
    type: 'fruit' | 'legume',
  ): ServiceFruitsEtLegumesConsommationViewModel {
    const RANGE_BASSE = 1;
    const RANGE_HAUTE = 5;

    return {
      peuConsommateurs: items
        .filter(item => item.type === type && item.impactCarboneKg < RANGE_BASSE)
        .map(item => ({ nom: item.titre, emoji: item.emoji }))
        .sort((a, b) => a.nom.localeCompare(b.nom)),
      moyennementConsommateurs: items
        .filter(item => item.type === type && item.impactCarboneKg >= RANGE_BASSE && item.impactCarboneKg < RANGE_HAUTE)
        .map(item => ({ nom: item.titre, emoji: item.emoji }))
        .sort((a, b) => a.nom.localeCompare(b.nom)),
      tresConsommateurs: items
        .filter(item => item.type === type && item.impactCarboneKg >= RANGE_HAUTE)
        .map(item => ({ nom: item.titre, emoji: item.emoji }))
        .sort((a, b) => a.nom.localeCompare(b.nom)),
    };
  }
}
