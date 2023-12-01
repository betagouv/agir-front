import { SimulerAideVeloPresenter } from '@/aides/ports/simulerAideVelo.presenter';
import { SimulerAideVeloRepository } from '@/aides/ports/simulerAideVelo.repository';

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

export type SimulationVelo = {
  [category in TypeVelos]: AidesVelo[];
};

export default class SimulerAideVeloUsecase {
  private _simulationAideVeloRepository: SimulerAideVeloRepository;

  constructor(simulationAideVeloRepository: SimulerAideVeloRepository) {
    this._simulationAideVeloRepository = simulationAideVeloRepository;
  }

  async execute(prixDuVelo: number, utilisateurId: string, presenter: SimulerAideVeloPresenter) {
    const reponse = await this._simulationAideVeloRepository.getSimulation(prixDuVelo, utilisateurId);
    presenter.presente(reponse);
  }
}
