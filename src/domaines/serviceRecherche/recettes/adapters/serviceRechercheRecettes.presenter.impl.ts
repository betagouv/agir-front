import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRechercheViewModel';
import { ServiceRechercheRecettesPresenter } from '@/domaines/serviceRecherche/recettes/ports/serviceRechercheRecettes.presenter';
import { ServiceRechercheRecettes } from '@/domaines/serviceRecherche/recettes/recupererServiceRecettes.usecase';
import { RouteServiceName } from '@/router/services/routes';

interface SuggestionRecetteServiceViewModel {
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

export interface ServiceRechercheRecettesViewModel extends ServiceRechercheViewModelBase {
  plusDeResultatsDisponibles: boolean;
  favoris?: SuggestionRecetteServiceViewModel[];
  suggestions: SuggestionRecetteServiceViewModel[];
}

export class ServiceRechercheRecettesPresenterImpl implements ServiceRechercheRecettesPresenter {
  constructor(private serviceRechercheRecettesViewModel: (viewModel: ServiceRechercheRecettesViewModel) => void) {}

  presente(serviceRechercheRecette: ServiceRechercheRecettes): void {
    this.serviceRechercheRecettesViewModel({
      plusDeResultatsDisponibles: serviceRechercheRecette.plusDeResultatsDisponibles,
      suggestions: serviceRechercheRecette.suggestions.map(elem => ({
        id: elem.id,
        titre: elem.titre,
        img: elem.img,
        description: elem.typeDePlat,
        information: `${elem.tempsDePreparation} min`,
        nombreMiseEnFavoris: elem.nombreFavoris,
        tag: this.determineTag(elem.difficulte),
        to: {
          name: RouteServiceName.RECETTES_DETAIL,
          params: { id: elem.id },
        },
      })),
      favoris:
        serviceRechercheRecette.favoris.length > 0
          ? serviceRechercheRecette.favoris.map(elem => ({
              id: elem.id,
              titre: elem.titre,
              img: elem.img,
              description: elem.typeDePlat,
              information: `${elem.tempsDePreparation} min`,
              nombreMiseEnFavoris: elem.nombreFavoris,
              tag: this.determineTag(elem.difficulte),
              to: {
                name: RouteServiceName.RECETTES_DETAIL,
                params: { id: elem.id },
              },
            }))
          : undefined,
      aside: {
        nom: 'La fabrique à Menus',
        description: 'Pour vous aider jour après jour à manger varié et équilibré.',
        url: 'https://www.mangerbouger.fr/manger-mieux/la-fabrique-a-menus/',
        logo: '/service-recettes-logo.webp',
        screenshot: '/service-recettes.webp',
      },
      categories: serviceRechercheRecette.categories.map(elem => ({
        code: elem.code,
        label: elem.label,
        estLaCategorieParDefaut: elem.estLaCategorieParDefaut,
      })),
    });
  }

  private determineTag(difficulte: string): { label: string; style: string } | undefined {
    switch (difficulte) {
      case 'Facile':
        return {
          label: 'Facile',
          style: 'background--vert-bourgeon',
        };
      case 'Intérmédiaire':
        return {
          label: 'Intermédiaire',
          style: 'background--bleu-ecume-hover',
        };
      case 'Avancé':
        return {
          label: 'Avancé',
          style: 'background--glycine',
        };
      default:
        return undefined;
    }
  }
}
