import { SimulerAideRetrofitRepository } from "@/aides/ports/simulerAideRetrofit.repository";
import { SimulationRetrofit } from "@/aides/simulerAideRetrofit.usecase";

export class SimulerAideRetrofitRepositoryAxios implements SimulerAideRetrofitRepository {
  getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationRetrofit> {
    return Promise.resolve({
      aides: [
        {
          libelle: "string",
          montant: "string",
        },
      ],
    });
  }
}
