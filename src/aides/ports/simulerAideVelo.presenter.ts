import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";
export interface SimulationAidesVeloViewModel {
  libelle: string;
  montant: string;
  enSavoirPlus: string;
}
export interface SimulerAideVeloPresenter {
  presente(simulationVelo: SimulationVelo): void;
}
