import { SimulerAideRetrofitPresenter } from '@/domaines/aides/ports/simulerAideRetrofit.presenter';
import { SimulerAideRetrofitRepository } from '@/domaines/aides/ports/simulerAideRetrofit.repository';

interface Aide {
  libelle: string;
  montant: number;
  lien: string;
}
export interface SimulationRetrofit {
  aides: Aide[];
}

export default class SimulerAideRetrofitUsecase {
  private _simulationAideRetrofitRepository: SimulerAideRetrofitRepository;

  constructor(simulationAideRetrofitRepository: SimulerAideRetrofitRepository) {
    this._simulationAideRetrofitRepository = simulationAideRetrofitRepository;
  }

  async execute(codePostal: string, revenuFiscalDeReference: string, presenter: SimulerAideRetrofitPresenter) {
    const reponse = await this._simulationAideRetrofitRepository.getSimulation(codePostal, revenuFiscalDeReference);
    presenter.presente(reponse);
  }
}
