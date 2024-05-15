import { SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export interface SimulationAidesVeloViewModel {
  [key: string]: {
    libelle: string;
    montant: number;
    plafond: number;
    lien: string;
    collectivite: Collectivite;
    description?: string;
    logo: string;
  }[];
}

interface Collectivite {
  kind: string;
  value: string;
  code?: string;
}

export interface SimulerAideVeloPresenter {
  presente(simulationVelo: SimulationVelo): void;
}
