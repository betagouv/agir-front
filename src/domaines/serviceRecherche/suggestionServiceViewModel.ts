export interface SuggestionServiceViewModel {
  id: string;
  titre: string;
  to: { name: string; params: { id: string } } | null;
  nombreMiseEnFavoris: number;
  img?: string;
  headerAlternatif?: {
    emoji: string;
    backgroundColor: string;
  };
  description?: string;
  information?: string;
  tag?: {
    label: string;
    style: string;
  };
  categories?: string;
}

interface AsideServiceViewModel {
  nom: string;
  description: string;
  url: string;
  urlLabel: string;
  logo: string;
  screenshot: string;
}

interface CategoriesViewModel {
  code: string;
  label: string;
  estLaCategorieParDefaut: boolean;
}

export interface ServiceRechercheViewModelBase {
  aside: AsideServiceViewModel;
  categories: CategoriesViewModel[];
}

interface ServiceRechercheCategorie {
  code: string;
  label: string;
  estLaCategorieParDefaut: boolean;
}

export interface ServiceRechercheBase {
  categories: ServiceRechercheCategorie[];
}
