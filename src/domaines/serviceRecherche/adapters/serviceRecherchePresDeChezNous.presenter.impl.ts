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

export interface ServiceRecherchePresDeChezNousViewModelAvecResultats extends ServiceRechercheViewModelBase {
  favoris?: SuggestionServiceViewModel[];
  suggestions: SuggestionServiceViewModel[];
  aucunResultat: false;
}

export interface ServiceRecherchePresDeChezNousViewModelSansResultats extends ServiceRechercheViewModelBase {
  aucunResultat: true;
}

export type ServiceRecherchePresDeChezNousViewModel =
  | ServiceRecherchePresDeChezNousViewModelAvecResultats
  | ServiceRecherchePresDeChezNousViewModelSansResultats;

export class ServiceRecherchePresDeChezNousPresenterImpl implements ServiceRecherchePresDeChezNousPresenter {
  constructor(private serviceRechercheViewModel: (viewModel: ServiceRecherchePresDeChezNousViewModel) => void) {}

  presente(serviceRecherche: ServiceRecherchePresDeChezNous): void {
    const aside = {
      nom: 'Près de chez nous',
      description:
        'Près de chez nous est une cartographie collaborative qui recense l’ensemble des structures qui proposent des produits bio, équitables et locaux.',
      url: 'https://presdecheznous.fr/',
      logo: '/service-proximite-logo.png',
      screenshot: '/service-proximite.png',
    };
    const categories = serviceRecherche.categories.map(elem => ({
      code: elem.code,
      label: elem.label,
      estLaCategorieParDefaut: elem.estLaCategorieParDefaut,
    }));

    let serviceRechercheViewModel: ServiceRecherchePresDeChezNousViewModel;

    if (serviceRecherche.suggestions.length > 0) {
      serviceRechercheViewModel = {
        suggestions: serviceRecherche.suggestions.map(elem => ({
          titre: elem.titre,
          description: elem.adresse,
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
              description: elem.adresse,
              nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
              img: elem.image ? elem.image : '/ic_services.svg',
            }))
          : undefined,
        aucunResultat: false,
        aside,
        categories,
      };
    } else {
      serviceRechercheViewModel = {
        aucunResultat: true,
        aside,
        categories,
      };
    }

    this.serviceRechercheViewModel(serviceRechercheViewModel);
  }

  private construireTag(distance: number): string {
    const distanceArrondie = Math.round(distance / 100) * 100;

    if (distanceArrondie >= 1000) {
      const distanceKm = distanceArrondie / 1000;
      return `À ${distanceKm.toFixed(1).replace('.', ',')} km`;
    }

    return `À ${distanceArrondie} m`;
  }
}
