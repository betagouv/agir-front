import { SimulationRetrofit } from '@/aides/simulerAideRetrofit.usecase';

export interface SimulerAideRetrofitRepository {
  getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationRetrofit>;
}
