import { SimulerAideRetrofitRepository } from "@/aides/ports/simulerAideRetrofit.repository";
import { SimulationRetrofit } from "@/aides/simulerAideRetrofit.usecase";
import { AxiosFactory } from "@/axios.factory";
import { EmpreinteApiModel } from "@/bilan/adapters/empreinteRepository.axios";

interface SimulerAideRetrofitApiModel {
  libelle: string;
  montant: string;
  lien: string;
}
export class SimulerAideRetrofitRepositoryAxios implements SimulerAideRetrofitRepository {
  async getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationRetrofit> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<SimulerAideRetrofitApiModel[]>(
        `aides/retrofit?codePostal=${codePostal}&revenuFiscalDeReference=${revenuFiscalDeReference}`
      );
      return {
        aides: response.data,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
