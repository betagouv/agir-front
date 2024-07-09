import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/adapters/serviceRechercheViewModel';
import { ServiceRecherchePresDeChezNousPresenter } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.presenter';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

export interface SuggestionServiceViewModel {
  titre: string;
  img?: string;
  description?: string;
  information?: string;
  nombreMiseEnFavoris: number;
  tag?: {
    label: string;
    style: string;
  };
}

export interface ServiceRecherchePresDeChezNousViewModel extends ServiceRechercheViewModelBase {
  titre: string;
  favoris?: SuggestionServiceViewModel[];
  suggestions: SuggestionServiceViewModel[];
}

export class ServiceRecherchePresDeChezNousPresenterImpl implements ServiceRecherchePresDeChezNousPresenter {
  constructor(private serviceRechercheViewModel: (viewModel: ServiceRecherchePresDeChezNousViewModel) => void) {}

  presente(serviceRecherche: ServiceRecherchePresDeChezNous): void {
    this.serviceRechercheViewModel({
      titre: 'Mon service',
      suggestions: serviceRecherche.suggestions.map(elem => ({
        titre: elem.titre,
        description: elem.adresse,
        nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
        img: '/ic_services.svg',
        tag: elem.distance
          ? {
              label: this.construireTag(elem.distance),
              style: 'background--caramel text--background-caramel',
            }
          : undefined,
      })),
      favoris: serviceRecherche.favoris.map(elem => ({
        titre: elem.titre,
        description: elem.adresse,
        nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
        img: '/ic_services.svg',
      })),
      aside: {
        nom: 'Mon service lorem',
        description: 'Ceci est la description de mon service',
        url: 'url',
        logo: 'logo',
        screenshot: 'screenshot',
      },
      categories: serviceRecherche.categories.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.estLaCategorieParDefaut,
      })),
    });
  }

  private construireTag(distance: number): string {
    const distanceArondie = Math.round(distance / 100) * 100;

    if (distanceArondie >= 1000) {
      const distanceKm = distanceArondie / 1000;
      return `À ${distanceKm.toFixed(1).replace('.', ',')}km`;
    }

    return `À ${distance}m`;
  }
}
