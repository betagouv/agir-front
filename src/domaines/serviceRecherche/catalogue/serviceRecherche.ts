interface ServiceRechercheCategorie {
  code: string;
  label: string;
  estLaCategorieParDefaut: boolean;
}

export interface ServiceRechercheBase {
  categories: ServiceRechercheCategorie[];
}
