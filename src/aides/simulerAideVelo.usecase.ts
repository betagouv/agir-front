import { SimulerAideVeloPresenter } from "@/aides/ports/simulerAideVelo.presenter";
import { SimulerAideVeloRepository } from "@/aides/ports/simulerAideVelo.repository";

interface Aide {
  libelle: string;
  montant: string;
  lien: string;
}
export interface SimulationVelo {
  aides: Aide[];
}

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
