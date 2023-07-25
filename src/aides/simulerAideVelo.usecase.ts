import { SimulerAideVeloPresenter } from "@/aides/ports/simulerAideVelo.presenter";
import { SimulerAideVeloRepository } from "@/aides/ports/simulerAideVelo.repository";

interface AidesVelo {
  libelle: string;
  montant: string;
  lien: string;
  collectivite: Collectivite;
  descritpion?: string;
}

interface Collectivite {
  kind: string;
  value: string;
  code?: string;
}

type TypeVelos = "mécanique simple" | "électrique" | "cargo" | "cargo électrique" | "pliant" | "motorisation";

export type SimulationVelo = {
  [category in TypeVelos]: AidesVelo[];
};

export default class SimulerAideVeloUsecase {
  private _simulationAideVeloRepository: SimulerAideVeloRepository;

  constructor(simulationAideVeloRepository: SimulerAideVeloRepository) {
    this._simulationAideVeloRepository = simulationAideVeloRepository;
  }

  async execute(codePostal: string, revenuFiscalDeReference: string, presenter: SimulerAideVeloPresenter) {
    const reponse = await this._simulationAideVeloRepository.getSimulation(codePostal, revenuFiscalDeReference);
    presenter.presente(reponse);
  }
}
