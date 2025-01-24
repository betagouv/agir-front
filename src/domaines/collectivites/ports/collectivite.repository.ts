export type Collectivites = {
  codeInsee: string;
  nom: string;
}[];

export interface CollectiviteRepository {
  findCollectivites(nom: string): Promise<Collectivites>;
}
