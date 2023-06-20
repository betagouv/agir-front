import { AxiosFactory } from "@/axios.factory.ts";
import { Empreinte, EmpreinteRepository } from "@/empreinte/ports/empreinteRepository.ts";

export interface EmpreinteApiModel {
  bilan: string;
}

export class EmpreinteRepositoryAxios implements EmpreinteRepository {
  async getEmpreinte(username: string): Promise<Empreinte> {
    try {
      const axiosInstance = AxiosFactory.getAxios();
      const response = await axiosInstance.get<EmpreinteApiModel>(`/bilan/${username}`);
      return {
        bilan: response.data.bilan,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async evaluerEmpreinte(utilisateur: string, situation: string): Promise<Boolean> {
    const axiosInstance = AxiosFactory.getAxios();

    await axiosInstance.post(`/bilan/evaluer`, {
      utilisateur,
      situation,
    });
    return true;
  }
}
