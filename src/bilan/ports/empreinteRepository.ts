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
  evaluerEmpreinte(utilisateur: string, situation: string): Promise<boolean>;
  importerSituationNGC(idNGC: string, utilisateurId: string): Promise<boolean>;
}
