import { ServiceRecherchePresenter } from '../ports/serviceRecherche.presenter';
import { ServiceRecherche } from '../recupererServiceRecherche.usecase';

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

interface CategoriesViewModel {
  code: string;
  label: string;
  estLaCategorieParDefaut: boolean;
}

export interface AsideServiceViewModel {
  nom: string;
  description: string;
  url: string;
  logo: string;
  screenshot: string;
}

export interface ServiceRechercheViewModel {
  titre: string;
  favoris?: SuggestionServiceViewModel[];
  suggestions: SuggestionServiceViewModel[];
  categories: CategoriesViewModel[];
  aside: AsideServiceViewModel;
}

export class ServiceRecherchePresenterImpl implements ServiceRecherchePresenter {
  constructor(private serviceRechercheViewModel: (viewModel: ServiceRechercheViewModel) => void) {}

  presente(serviceRecherche: ServiceRecherche): void {
    this.serviceRechercheViewModel({
      titre: 'Mon service',
      suggestions: serviceRecherche.suggestions.map(elem => ({
        titre: elem.titre,
        description: elem.adresse,
        nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
        img: '/ic_services.svg',
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
}
