import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRechercheViewModel';
import { ServiceRechercheLongueVieAuxObjetsPresenter } from '@/domaines/serviceRecherche/longueVieAuxObjets/ports/serviceRechercheLongueVieAuxObjets.presenter';
import { ServiceRechercheLongueVieAuxObjets } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
import { RouteServiceName } from '@/router/services/routes';

export interface SuggestionServiceViewModel {
  id: string;
  titre: string;
  img: string;
  description?: string;
  information?: string;
  nombreMiseEnFavoris: number;
  tag?: {
    label: string;
    style: string;
  };
  to: { name: string; params: { id: string } } | null;
}

export interface ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats extends ServiceRechercheViewModelBase {
  favoris?: SuggestionServiceViewModel[];
  suggestions: SuggestionServiceViewModel[];
  aucunResultat: false;
}

export interface ServiceRechercheLongueVieAuxObjetsViewModelSansResultats extends ServiceRechercheViewModelBase {
  aucunResultat: true;
}

export type ServiceRechercheLongueVieAuxObjetsViewModel =
  | ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
  | ServiceRechercheLongueVieAuxObjetsViewModelSansResultats;

export class ServiceRechercheLongueVieAuxObjetsPresenterImpl implements ServiceRechercheLongueVieAuxObjetsPresenter {
  constructor(
    private serviceRechercheViewModel: (viewModel: ServiceRechercheLongueVieAuxObjetsViewModel) => void,
    private erreur: (messageErreur: string | null) => void,
  ) {}

  presenteErreur() {
    this.erreur(
      'Le service prend plus de temps que prévu à répondre. Merci de recharger la page ou réessayer plus tard.',
    );
  }

  presente(serviceRecherche: ServiceRechercheLongueVieAuxObjets): void {
    const aside = {
      nom: 'Longue Vie Aux Objets - ADEME',
      description:
        "L'ADEME vous aide à trouver des alternatives à l'achat et à prolonger la vie de vos objets. Pour préserver les ressources de la planète.... et de votre porte-monnaie !",
      url: 'https://longuevieauxobjets.ademe.fr/',
      logo: '',
      screenshot: '/service-longue-vie-aux-objets.webp',
    };
    const categories = serviceRecherche.categories.map(elem => ({
      code: elem.code,
      label: elem.label,
      estLaCategorieParDefaut: elem.estLaCategorieParDefaut,
    }));

    let serviceRechercheViewModel: ServiceRechercheLongueVieAuxObjetsViewModel;

    if (serviceRecherche.suggestions.length > 0) {
      serviceRechercheViewModel = {
        suggestions: serviceRecherche.suggestions.map(elem => ({
          id: elem.id,
          titre: elem.titre,
          description: elem.adresse,
          nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
          img: elem.image ? elem.image : '/ic_service_longue_vie_aux_objets.svg',
          tag: elem.distance
            ? {
                label: this.construireTag(elem.distance),
                style: 'background--caramel text--background-caramel',
              }
            : undefined,
          to: { name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL, params: { id: elem.id } },
        })),
        favoris: serviceRecherche.favoris
          ? serviceRecherche.favoris.map(elem => ({
              id: elem.id,
              titre: elem.titre,
              description: elem.adresse,
              nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
              img: elem.image ? elem.image : '/ic_service_longue_vie_aux_objets.svg',
              to: { name: RouteServiceName.LONGUE_VIE_AUX_OBJETS_DETAIL, params: { id: elem.id } },
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
    this.erreur(null);
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
