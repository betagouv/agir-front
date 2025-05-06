import { StatistiquesCommuneEtAdresse } from '@/domaines/simulationMaif/recupererStatistiquesCommuneMaifDepuisProfil.usecase';
import { StatistiquesEndroitMaif } from '@/domaines/simulationMaif/recupererStatistiquesEndroitMaif.usecase';
import { Coordonnees } from '@/shell/coordonneesType';

export type ResultatSimulationMaif = {
  risques: {
    id: string;
    nom: string;
    impact: RisqueMaifImpact;
  }[];
};

export enum RisqueMaifImpact {
  TRES_FAIBLE = 0,
  FAIBLE = 1,
  MOYEN = 2,
  FORT = 3,
  TRES_FORT = 4,
}

export interface SimulateurMaifRepository {
  recupererStatistiquesCommuneEtAdresse(utilisateurId: string): Promise<StatistiquesCommuneEtAdresse>;

  recupererStatistiquesEndroit(utilisateurId: string, codeEPCI: string): Promise<StatistiquesEndroitMaif>;

  recupererResultats(utilisateurId: string, coordonnees: Coordonnees): Promise<ResultatSimulationMaif>;
}
