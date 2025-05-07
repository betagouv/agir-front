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
  INCONNU = 0,
  TRES_FAIBLE = 1,
  FAIBLE = 2,
  MOYEN = 3,
  FORT = 4,
  TRES_FORT = 5,
}

export interface SimulateurMaifRepository {
  recupererStatistiquesCommuneEtAdresse(utilisateurId: string): Promise<StatistiquesCommuneEtAdresse>;

  recupererStatistiquesEndroit(utilisateurId: string, codeEpci: string): Promise<StatistiquesEndroitMaif>;

  recupererResultats(utilisateurId: string, coordonnees: Coordonnees): Promise<ResultatSimulationMaif>;
}
