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
      fruits: {
        peuConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
          .filter(elem => elem.type === 'fruit' && elem.impactCarboneKg < 1)
          .map(elem => ({ nom: elem.titre, emoji: elem.emoji }))
          .sort((a, b) => a.nom.localeCompare(b.nom)),
        moyennementConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
          .filter(elem => elem.type === 'fruit' && elem.impactCarboneKg >= 1 && elem.impactCarboneKg < 5)
          .map(elem => ({ nom: elem.titre, emoji: elem.emoji }))
          .sort((a, b) => a.nom.localeCompare(b.nom)),
        tresConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
          .filter(elem => elem.type === 'fruit' && elem.impactCarboneKg >= 5)
          .map(elem => ({ nom: elem.titre, emoji: elem.emoji }))
          .sort((a, b) => a.nom.localeCompare(b.nom)),
      },
      legumes: {
        peuConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
          .filter(elem => elem.type === 'legume' && elem.impactCarboneKg < 1)
          .map(elem => ({ nom: elem.titre, emoji: elem.emoji }))
          .sort((a, b) => a.nom.localeCompare(b.nom)),
        moyennementConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
          .filter(elem => elem.type === 'legume' && elem.impactCarboneKg >= 1 && elem.impactCarboneKg < 5)
          .map(elem => ({ nom: elem.titre, emoji: elem.emoji }))
          .sort((a, b) => a.nom.localeCompare(b.nom)),
        tresConsommateurs: serviceRechercheFruitsEtLegumes.listeFruitsEtLegumes
          .filter(elem => elem.type === 'legume' && elem.impactCarboneKg >= 5)
          .map(elem => ({ nom: elem.titre, emoji: elem.emoji }))
          .sort((a, b) => a.nom.localeCompare(b.nom)),
      },
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
