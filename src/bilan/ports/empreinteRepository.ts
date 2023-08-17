interface EmpreinteDetail {
  alimentation: number;
  divers: number;
  logement: number;
  servicesSocietaux: number;
  transport: number;
}
export interface Empreinte {
  bilan: number;
  detail: EmpreinteDetail;
}

export interface EmpreinteRepository {
  getEmpreinte(username: string): Promise<Empreinte>;
  importSituationNGC(idNGC: string, utilisateurId: string): Promise<boolean>;
}
