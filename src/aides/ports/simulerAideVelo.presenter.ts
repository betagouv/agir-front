import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";

export interface SimulationAidesVeloViewModel {
  [key: string]: {
    libelle: string;
    montant: string;
    logo: string;
    collectivite: Collectivite;
    description?: string;
    lien: string;
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
