export interface SyntheseThematiques {
  commune: string;
  listeThematiques: {
    thematique: string;
    nombreRecettes: number;
    nombreActions: number;
    nombreAides: number;
    nombreSimulateurs: number;
  }[];
}

export interface ThematiqueRepository {
  recupererSyntheseThematiques(utilisateurId: string): Promise<SyntheseThematiques>;
}
