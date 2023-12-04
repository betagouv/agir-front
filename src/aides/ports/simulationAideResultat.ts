export interface AideResultat {
  libelle: string;
  description?: string;
  lien: string;
  montant: number;
  logo: string;
}

export interface SimulationAideResultatViewModel {
  titre: string;
  montantTotal: number;
  aides: AideResultat[];
}
