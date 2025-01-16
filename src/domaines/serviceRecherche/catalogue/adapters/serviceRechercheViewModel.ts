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
