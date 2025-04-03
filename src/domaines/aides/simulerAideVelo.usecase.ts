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

export type AideVeloNonCalculee = Omit<AidesVelo, 'montant' | 'plafond'>;

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

export type EtatVelo = 'neuf' | 'occasion';

export const OptionsEtatVelo: Array<{ label: string; code: EtatVelo; estLaCategorieParDefaut: boolean }> = [
  { label: 'neuf', code: 'neuf', estLaCategorieParDefaut: true },
  { label: "d'occasion", code: 'occasion', estLaCategorieParDefaut: false },
];

export type SimulationVelo = {
  [category in TypeVelos]: AidesVelo[];
};

export type AidesVeloDisponibles = AideVeloNonCalculee[];

export default class SimulerAideVeloUsecase {
  private _simulationAideVeloRepository: SimulerAideVeloRepository;

  constructor(simulationAideVeloRepository: SimulerAideVeloRepository) {
    this._simulationAideVeloRepository = simulationAideVeloRepository;
  }

  async execute(
    prixDuVelo: number,
    etatDuVelo: EtatVelo,
    situationHandicap: boolean,
    utilisateurId: string,
    presenter: SimulerAideVeloPresenter,
  ) {
    const reponse = await this._simulationAideVeloRepository.getSimulation(
      prixDuVelo,
      etatDuVelo,
      situationHandicap,
      utilisateurId,
    );
    presenter.presente(reponse);
  }
}
