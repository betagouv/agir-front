import { SimulerAideVeloRepository } from "@/aides/ports/simulerAideVelo.repository";
import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";
import { AxiosFactory } from "@/axios.factory";

interface AidesVelo {
  libelle: string;
  montant: number;
  plafond: number;
  lien: string;
  collectivite: Collectivite;
  description?: string;
  logo: string;
}

interface Collectivite {
  kind: string;
  value: string;
  code?: string;
}

type TypeVelos = "mécanique simple" | "électrique" | "cargo" | "cargo électrique" | "pliant" | "motorisation";

type AidesVeloParType = {
  [category in TypeVelos]: AidesVelo[];
};

export class SimulerAideVeloRepositoryAxios implements SimulerAideVeloRepository {
  async getSimulation(codePostal: string, revenuFiscalDeReference: string): Promise<SimulationVelo> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<AidesVeloParType>(`aides/velos?codePostal=${codePostal}&revenuFiscalDeReference=${revenuFiscalDeReference}`);
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
