export type Communes = string[];

export interface CommuneRepository {
  getCommunes(codePostal: string): Promise<Communes>;
}
