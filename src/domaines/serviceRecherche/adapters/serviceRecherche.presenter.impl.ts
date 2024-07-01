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

export interface CarouselServiceViewModel {
  titre: string;
  img: string;
  information?: string;
  tag: {
    label: string;
    style: string;
  };
}

export interface ServiceRechercheViewModel {
  titre: string;
  favoris?: SuggestionServiceViewModel[];
  suggestions: SuggestionServiceViewModel[];
  aside: {
    nom: string;
    description: string;
    url: string;
    logo: string;
    screenshot: string;
  };
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
      })),
      favoris: serviceRecherche.favoris.map(elem => ({
        titre: elem.titre,
        description: elem.adresse,
        nombreMiseEnFavoris: elem.nombreMiseEnFavoris,
      })),
      aside: {
        nom: 'Mon service lorem',
        description: 'Ceci est la description de mon service',
        url: 'url',
        logo: 'logo',
        screenshot: 'screenshot',
      },
    });
  }
}
