export interface TitreCatalogue {
  code: string;
  titre: string;
  description: string;
  image: string;
}

export interface TitreCatalogueRepository {
  recupererTousLesTitres(): Promise<TitreCatalogue[]>;
}
