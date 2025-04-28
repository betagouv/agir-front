export type ResultatSimulationMaif = {
  commune: string;
  chiffresCles: {
    valeur: string;
    label: string;
  }[];

  adresse?: string;
  risques?: {
    nom: string;
    description: string;
    image: string;
    impact: RisqueMaifImpact;
  }[];
  lienKit?: string;
};

export enum RisqueMaifImpact {
  TRES_FAIBLE = 'tres-faible',
  FAIBLE = 'faible',
  FORT = 'fort',
  TRES_FORT = 'tres-fort',
}

export interface SimulateurMaifRepository {
  recupererResultats(utilisateurId: string): Promise<ResultatSimulationMaif>;
}
