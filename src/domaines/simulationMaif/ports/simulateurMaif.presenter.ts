import { ResultatSimulationMaif } from '@/domaines/simulationMaif/ports/simulateurMaif.repository';

export interface SimulateurMaifPresenter {
  presente(resultatSimulateur: ResultatSimulationMaif): void;
}
