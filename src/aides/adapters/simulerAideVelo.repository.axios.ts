import { SimulerAideVeloRepository } from "@/aides/ports/simulerAideVelo.repository";
import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";
import { AxiosFactory } from "@/axios.factory";
import { EmpreinteApiModel } from "@/bilan/adapters/empreinteRepository.axios";

interface SimulerAideVeloApiModel {
  libelle: string;
  montant: string;
  lien: string;
}
export class SimulerAideVeloRepositoryAxios implements SimulerAideVeloRepository {
  async getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationVelo> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<SimulerAideVeloApiModel[]>(
        `aides/Velo?codePostal=${codePostal}&revenuFiscalDeReference=${revenuFiscalDeReference}`
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
