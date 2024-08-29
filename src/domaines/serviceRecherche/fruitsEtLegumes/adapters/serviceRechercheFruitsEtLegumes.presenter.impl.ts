import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRechercheViewModel';
import { ServiceRechercheFruitsEtLegumesPresenter } from '@/domaines/serviceRecherche/fruitsEtLegumes/ports/serviceRechercheFruitsEtLegumes.presenter';
import { ServiceRechercheFruitsEtLegumes } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';

export interface ServiceFruitsEtLegumesDetailViewModel {
  nom: string;
  urlImage: string;
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
      fruits: this.categoriserFruitEtLegume(serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes, [
        'fruit',
        'fruit_et_legume',
      ]),
      legumes: this.categoriserFruitEtLegume(serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes, [
        'legume',
        'fruit_et_legume',
      ]),
      aside: {
        nom: 'Impact CO₂',
        description: 'Des informations fiables et sourcées issues des données environnementales de l’ADEME',
        url: 'https://impactco2.fr/',
        logo: '/service-fruits-logo.png',
        screenshot: '/service-fruits.png',
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
    type: string[],
  ): ServiceFruitsEtLegumesConsommationViewModel {
    const RANGE_BASSE = 1;
    const RANGE_HAUTE = 5;

    return {
      peuConsommateurs: items
        .filter(item => type.includes(item.type) && item.impactCarboneKg < RANGE_BASSE)
        .map(item => ({ nom: item.titre, urlImage: item.urlImage }))
        .sort((a, b) => a.nom.localeCompare(b.nom)),
      moyennementConsommateurs: items
        .filter(
          item => type.includes(item.type) && item.impactCarboneKg >= RANGE_BASSE && item.impactCarboneKg < RANGE_HAUTE,
        )
        .map(item => ({ nom: item.titre, urlImage: item.urlImage }))
        .sort((a, b) => a.nom.localeCompare(b.nom)),
      tresConsommateurs: items
        .filter(item => type.includes(item.type) && item.impactCarboneKg >= RANGE_HAUTE)
        .map(item => ({ nom: item.titre, urlImage: item.urlImage }))
        .sort((a, b) => a.nom.localeCompare(b.nom)),
    };
  }
}
