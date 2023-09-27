export interface AideResultat {
  libelle: string;
  description?: string;
  lien: string;
  montant: number;
  logo: string;
}

export interface SimulationAideResultatViewModel {
  [key: string]: AideResultat[];
}
