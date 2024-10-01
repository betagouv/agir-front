export interface AideResultat {
  libelle: string;
  description?: string;
  lien: string;
  montant: number;
  logo: string;
}

export interface AideResultats {
  titre: string;
  montantTotal: number;
  aides: AideResultat[];
}

export interface SimulationAideResultatViewModel {
  aucunResultat: boolean;
  resultats: AideResultats[];
}
