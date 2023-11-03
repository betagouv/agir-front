export interface CommuneRepository {
  getCommunes(codePostal: string): Promise<string[]>;
}
