import { AxiosFactory, intercept401 } from '@/axios.factory';
import { SimulerAideVeloRepository } from '@/domaines/aides/ports/simulerAideVelo.repository';
import { EtatVelo, SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

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

type TypeVelos =
  | 'mécanique simple'
  | 'électrique'
  | 'cargo'
  | 'cargo électrique'
  | 'pliant'
  | 'pliant électrique'
  | 'adapté'
  | 'motorisation';

type AidesVeloParType = {
  [typeVelo in TypeVelos]: AidesVelo[];
};

export class SimulerAideVeloRepositoryAxios implements SimulerAideVeloRepository {
  @intercept401()
  async getSimulation(prixDuVelo: number, etatDuVelo: EtatVelo, utilisateurId: string): Promise<SimulationVelo> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<AidesVeloParType>(`/utilisateurs/${utilisateurId}/simulerAideVelo`, {
      prix_du_velo: prixDuVelo,
      etat_du_velo: etatDuVelo,
    });

    return {
      'mécanique simple': response.data['mécanique simple'] ?? [],
      électrique: response.data.électrique ?? [],
      cargo: response.data.cargo ?? [],
      'cargo électrique': response.data['cargo électrique'] ?? [],
      pliant: response.data.pliant ?? [],
      'pliant électrique': response.data['pliant électrique'] ?? [],
      motorisation: response.data.motorisation ?? [],
      adapté: response.data.adapté ?? [],
    };
  }

  async getSimulationDepuisInsee(insee: string): Promise<SimulationVelo> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<AidesVeloParType>(`/aides/simulerAideVelo`, {
      code_insee: insee,
    });

    return {
      'mécanique simple': response.data['mécanique simple'] ?? [],
      électrique: response.data.électrique ?? [],
      cargo: response.data.cargo ?? [],
      'cargo électrique': response.data['cargo électrique'] ?? [],
      pliant: response.data.pliant ?? [],
      'pliant électrique': response.data['pliant électrique'] ?? [],
      motorisation: response.data.motorisation ?? [],
      adapté: response.data.adapté ?? [],
    };
  }
}
