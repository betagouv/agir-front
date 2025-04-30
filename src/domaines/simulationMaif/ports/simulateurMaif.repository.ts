import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaif.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export type ResultatSimulationMaif = {
  risques: {
    nom: string;
    impact: RisqueMaifImpact;
  }[];
};

export enum RisqueMaifImpact {
  TRES_FAIBLE = 'tres_faible',
  FAIBLE = 'faible',
  MOYEN = 'moyen',
  FORT = 'fort',
  TRES_FORT = 'tres_fort',
}

export interface SimulateurMaifRepository {
  recupererStatistiquesCommune(utilisateurId: string): Promise<StatistiquesCommuneMaif>;

  recupererResultats(utilisateurId: string, coordonnees: Coordonnees): Promise<ResultatSimulationMaif>;
}
