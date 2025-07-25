import { ServiceRecherchePresDeChezNousPresenter } from '@/domaines/serviceRecherche/presDeChezNous/ports/serviceRecherchePresDeChezNous.presenter';
import { ServiceRecherchePresDeChezNous } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
import {
  ServiceRechercheViewModelBase,
  SuggestionServiceViewModel,
} from '@/domaines/serviceRecherche/suggestionServiceViewModel';
import { RouteServiceName } from '@/router/services/routes';

export interface ServiceRecherchePresDeChezNousViewModelAvecResultats extends ServiceRechercheViewModelBase {
  favoris?: SuggestionServiceViewModel[];
  suggestions: SuggestionServiceViewModel[];
  aucunResultat: false;
  plusDeResultatsDisponibles: boolean;
}

export interface ServiceRecherchePresDeChezNousViewModelSansResultats extends ServiceRechercheViewModelBase {
  aucunResultat: true;
}

export type ServiceRecherchePresDeChezNousViewModel =
  | ServiceRecherchePresDeChezNousViewModelAvecResultats
  | ServiceRecherchePresDeChezNousViewModelSansResultats;

export class ServiceRecherchePresDeChezNousPresenterImpl implements ServiceRecherchePresDeChezNousPresenter {
  constructor(
    private serviceRechercheViewModel: (viewModel: ServiceRecherchePresDeChezNousViewModel) => void,
    private erreur: (messageErreur: string | null) => void,
  ) {}

  presenteErreur() {
    this.erreur(
      'Le service prend plus de temps que prévu à répondre. Merci de recharger la page ou réessayer plus tard.',
    );
  }

  presente(serviceRecherche: ServiceRecherchePresDeChezNous): void {
    const aside = {
      nom: 'Près de chez nous',
      description:
        'Près de chez nous est une cartographie collaborative qui recense l’ensemble des structures qui proposent des produits bio, équitables et locaux.',
      urlLabel: 'https://presdecheznous.fr/',
      url: 'https://presdecheznous.fr/',
      logo: '/service-proximite-logo.webp',
      screenshot: '/service-proximite.webp',
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
          id: elem.id,
          titre: elem.titre,
          description: elem.adresse,
          nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
          headerAlternatif: {
            emoji: '🥘',
            backgroundColor: '#fff0e6',
          },
          tag: elem.distance
            ? {
                label: this.construireTag(elem.distance),
                style: 'fr-tag--custom-bleu',
              }
            : undefined,
          to: { name: RouteServiceName.PROXIMITE_DETAIL, params: { id: elem.id } },
        })),
        favoris: serviceRecherche.favoris
          ? serviceRecherche.favoris.map(elem => ({
              id: elem.id,
              titre: elem.titre,
              description: elem.adresse,
              nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
              img: elem.image ? elem.image : '/ic_services.svg',
              to: { name: RouteServiceName.PROXIMITE_DETAIL, params: { id: elem.id } },
            }))
          : undefined,
        aucunResultat: false,
        aside,
        categories,
        plusDeResultatsDisponibles: serviceRecherche.plusDeResultatsDisponibles,
      };
    } else {
      serviceRechercheViewModel = {
        aucunResultat: true,
        aside,
        categories,
      };
    }

    this.serviceRechercheViewModel(serviceRechercheViewModel);
    this.erreur(null);
  }

  private construireTag(distance: number): string {
    const distanceArrondie = Math.round(distance / 100) * 100;

    if (distanceArrondie >= 1000) {
      const distanceKm = distanceArrondie / 1000;
      return `À ${distanceKm.toFixed(1).replace('.', ',')} km`;
    }

    if (distanceArrondie === 0) {
      return 'À deux pas';
    }

    return `À ${distanceArrondie} m`;
  }
}
