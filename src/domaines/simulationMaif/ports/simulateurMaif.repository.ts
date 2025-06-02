import { StatistiquesCommuneMaif } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export type ResultatSimulationMaif = {
  risques: {
    id: string;
    nom: string;
    impact: RisqueMaifImpact;
  }[];
};

export enum RisqueMaifImpact {
  INCONNU = 0,
  TRES_FAIBLE = 1,
  FAIBLE = 2,
  MOYEN = 3,
  FORT = 4,
  TRES_FORT = 5,
}

export interface SimulateurMaifRepository {
  recupererStatistiquesCommune(utilisateurId: string, codeEpci?: string): Promise<StatistiquesCommuneMaif>;

  recupererResultats(utilisateurId: string, coordonnees: Coordonnees): Promise<ResultatSimulationMaif>;
}
