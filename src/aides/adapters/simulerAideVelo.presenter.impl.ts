import { SimulerAideVeloPresenter } from '@/aides/ports/simulerAideVelo.presenter';
import { SimulationVelo } from '@/aides/simulerAideVelo.usecase';
import { SimulationAideResultatViewModel } from '@/aides//ports/simulationAideResultat';

export class SimulerAideVeloPresenterImpl implements SimulerAideVeloPresenter {
  constructor(private _viewModel: (simulationAideResultatViewModel: SimulationAideResultatViewModel) => void) {}

  presente(simulationVelo: SimulationVelo): void {
    this._viewModel(simulationVelo);
  }
}
