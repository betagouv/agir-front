import { SimulerAideVeloPresenter } from '@/domaines/aides/ports/simulerAideVelo.presenter';
import { SimulerAideVeloRepository } from '@/domaines/aides/ports/simulerAideVelo.repository';

export interface AidesVelo {
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

export type TypeVelos =
  | 'mécanique simple'
  | 'électrique'
  | 'cargo'
  | 'cargo électrique'
  | 'pliant'
  | 'pliant électrique'
  | 'adapté'
  | 'motorisation';

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
