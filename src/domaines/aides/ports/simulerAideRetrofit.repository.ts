import { SimulationRetrofit } from '@/domaines/aides/simulerAideRetrofit.usecase';

export interface SimulerAideRetrofitRepository {
  getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationRetrofit>;
}
