import { AxiosFactory, intercept40X } from '@/axios.factory';
import { SimulerAideVeloRepository } from '@/domaines/aides/ports/simulerAideVelo.repository';
import { AidesVeloDisponibles, EtatVelo, SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

type AidesVeloApiModel = {
  libelle: string;
  montant: number;
  plafond: number;
  lien: string;
  collectivite: CollectiviteApiModel;
  description?: string;
  logo: string;
};

type AideVeloNonCalculeeApiModel = Omit<AidesVeloApiModel, 'montant' | 'plafond'>;

type CollectiviteApiModel = {
  kind: string;
  value: string;
  code?: string;
};

type TypeVelosApiModel =
  | 'mécanique simple'
  | 'électrique'
  | 'cargo'
  | 'cargo électrique'
  | 'pliant'
  | 'pliant électrique'
  | 'adapté'
  | 'motorisation';

type AidesVeloParTypeApiModel = {
  [typeVelo in TypeVelosApiModel]: AidesVeloApiModel[];
};

export class SimulerAideVeloRepositoryAxios implements SimulerAideVeloRepository {
  @intercept40X()
  async getSimulation(
    prixDuVelo: number,
    etatDuVelo: EtatVelo,
    situationHandicap: boolean,
    utilisateurId: string,
  ): Promise<SimulationVelo> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<AidesVeloParTypeApiModel>(
      `/utilisateurs/${utilisateurId}/simulerAideVelo`,
      {
        prix_du_velo: prixDuVelo,
        etat_du_velo: etatDuVelo,
        situation_handicap: situationHandicap,
      },
    );

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

  /**
   * @param code - Code INSEE de la commune ou SIREN de l'EPCI.
   * @returns Les aides disponibles pour la commune ou l'EPCI. C'est-à-dire aux
   * quelles les habitants de la commune ou de l'EPCI peuvent prétendre, mais
   * ne seront pas nécessairement éligibles comme ça aurait été le cas avec une
   * simulation.
   */
  async getAidesDisponiblesPourCommuneOuEpci(code: string): Promise<AidesVeloDisponibles> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.post<AideVeloNonCalculeeApiModel[]>(
      `/aides/recupererAideVeloParCodeCommuneOuEPCI`,
      {
        code_insee_ou_siren: code,
      },
    );

    return response.data ?? [];
  }
}
