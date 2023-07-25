import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";
export interface SimulationAidesVeloViewModel {
  [key: string]: Object[];
}

export interface SimulerAideVeloPresenter {
  presente(simulationVelo: SimulationVelo): void;
}
