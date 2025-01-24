export type Communes = string[];
export type Collectivites = {
  codeInsee: string;
  nom: string;
}[];

export interface CommuneRepository {
  getCommunes(codePostal: string): Promise<Communes>;
  findCollectivites(nom: string): Promise<Collectivites>;
}
