import { SimulerAideVeloRepository } from '@/aides/ports/simulerAideVelo.repository';
import { SimulationVelo } from '@/aides/simulerAideVelo.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

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

type TypeVelos = 'mécanique simple' | 'électrique' | 'cargo' | 'cargo électrique' | 'pliant' | 'motorisation';

type AidesVeloParType = {
  [category in TypeVelos]: AidesVelo[];
};

export class SimulerAideVeloRepositoryAxios implements SimulerAideVeloRepository {
  @intercept401()
  async getSimulation(prixDuVelo: number, utilisateurId: string): Promise<SimulationVelo> {
    const axiosInstance = AxiosFactory.getInstance().axiosBack;
    const response = await axiosInstance.post<AidesVeloParType>(`/utilisateurs/${utilisateurId}/simulerAideVelo`, {
      prix_du_velo: prixDuVelo,
    });
    return response.data;
  }
}
