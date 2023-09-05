import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";

export interface SimulerAideVeloRepository {
  getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationVelo>;
}
