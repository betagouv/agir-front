export type Communes = string[];
export type CommunesEPCI = {
  codeInsee: string;
  nom: string;
}[];

export interface CommuneRepository {
  getCommunes(codePostal: string): Promise<Communes>;
  getCommunesEPCI(nom: string): Promise<CommunesEPCI>;
}
