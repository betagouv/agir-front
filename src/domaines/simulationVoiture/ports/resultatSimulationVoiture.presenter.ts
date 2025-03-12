import { ResultatSimulationVoiture } from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';

export interface ResultatSimulationVoiturePresenter {
  presente(resultatSimulationVoiture: ResultatSimulationVoiture): void;
}
