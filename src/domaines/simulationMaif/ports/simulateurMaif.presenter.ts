import { ResultatSimulationMaif } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';
import { Coordonnees } from '@/shell/coordonneesType';

export interface SimulateurMaifPresenter {
  presente(resultatSimulateur: ResultatSimulationMaif, coordonnees: Coordonnees): void;
}
