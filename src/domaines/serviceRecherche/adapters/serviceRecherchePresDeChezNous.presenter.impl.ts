import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/adapters/serviceRechercheViewModel';
import { ServiceRecherchePresDeChezNousPresenter } from '@/domaines/serviceRecherche/ports/serviceRecherchePresDeChezNous.presenter';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';

export interface SuggestionServiceViewModel {
  titre: string;
  img: string;
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
        description: elem.adresse ? elem.adresse : undefined,
        nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
        img: elem.image ? elem.image : '/ic_services.svg',
        tag: elem.distance
          ? {
              label: this.construireTag(elem.distance),
              style: 'background--caramel text--background-caramel',
            }
          : undefined,
      })),
      favoris: serviceRecherche.favoris
        ? serviceRecherche.favoris.map(elem => ({
            titre: elem.titre,
            description: elem.adresse ? elem.adresse : undefined,
            nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
            img: elem.image ? elem.image : '/ic_services.svg',
          }))
        : undefined,
      aside: {
        nom: 'Près de chez nous',
        description:
          'Près de chez nous est une cartographie collaborative qui recense l’ensemble des structures qui proposent des produits bio, équitables et locaux.',
        url: 'https://presdecheznous.fr/',
        logo: '/service-proximite-logo.png',
        screenshot: '/service-proximite.png',
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
      return `À ${distanceKm.toFixed(1).replace('.', ',')} km`;
    }

    return `À ${distanceArondie} m`;
  }
}
