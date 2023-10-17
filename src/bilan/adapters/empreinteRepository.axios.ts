import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Empreinte, EmpreinteRepository } from '@/bilan/ports/empreinteRepository';

interface EmpreinteDetailApiModel {
  alimentation: number;
  divers: number;
  logement: number;
  services_societaux: number;
  transport: number;
}
export interface EmpreinteApiModel {
  bilan_carbone_annuel: number;
  details: EmpreinteDetailApiModel;
}

export class EmpreinteRepositoryAxios implements EmpreinteRepository {
  @intercept401()
  async getEmpreinte(utilisateurId: string): Promise<Empreinte> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<EmpreinteApiModel>(`/utilisateur/${utilisateurId}/bilans/last`);
    return {
      bilan: response.data.bilan_carbone_annuel,
      detail: {
        alimentation: response.data.details.alimentation,
        divers: response.data.details.divers,
        logement: response.data.details.logement,
        servicesSocietaux: response.data.details.services_societaux,
        transport: response.data.details.transport,
      },
    };
  }

  @intercept401()
  async importSituationNGC(situationId: string, utilisateurId: string): Promise<boolean> {
    const axiosInstance = AxiosFactory.getAxios();
    try {
      await axiosInstance.post(`/utilisateurs/${utilisateurId}/bilans/${situationId}`, {});
      return true;
    } catch (e) {
      return false;
    }
  }
}
