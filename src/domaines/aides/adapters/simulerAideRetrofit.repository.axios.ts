import { AxiosFactory } from '@/axios.factory';
import { SimulerAideRetrofitRepository } from '@/domaines/aides/ports/simulerAideRetrofit.repository';
import { SimulationRetrofit } from '@/domaines/aides/simulerAideRetrofit.usecase';

interface SimulerAideRetrofitApiModel {
  libelle: string;
  montant: number;
  lien: string;
}

export class SimulerAideRetrofitRepositoryAxios implements SimulerAideRetrofitRepository {
  async getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationRetrofit> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<SimulerAideRetrofitApiModel[]>(
      `aides/retrofit?codePostal=${codePostal}&revenuFiscalDeReference=${revenuFiscalDeReference}`,
    );
    return {
      aides: response.data,
    };
  }
}
