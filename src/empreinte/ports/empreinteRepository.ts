export interface Empreinte {
  bilan: string;
}

export interface EmpreinteRepository {
  getEmpreinte(username: string): Promise<Empreinte>;
  evaluerEmpreinte(utilisateur: string, situation: string): Promise<Boolean>;
}
