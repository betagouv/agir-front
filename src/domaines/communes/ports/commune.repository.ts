export type Commune = { codeEpci: string; label: string };

export interface CommuneRepository {
  getCommunes(codePostal: string): Promise<Commune[]>;
}
