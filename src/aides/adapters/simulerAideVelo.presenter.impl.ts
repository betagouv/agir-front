import { SimulationAidesVeloViewModel, SimulerAideVeloPresenter } from "@/aides/ports/simulerAideVelo.presenter";
import { SimulationVelo } from "@/aides/simulerAideVelo.usecase";

export class SimulerAideVeloPresenterImpl implements SimulerAideVeloPresenter {
  private _viewModel: (simulationAidesVeloViewModel: SimulationAidesVeloViewModel[]) => void;
  constructor(viewModel: (simulationAidesVeloViewModel: SimulationAidesVeloViewModel[]) => void) {
    this._viewModel = viewModel;
  }

  presente(simulationVelo: SimulationVelo): void {
    this._viewModel(
      simulationVelo.aides.map((aide) => {
        return {
          libelle: aide.libelle,
          montant: `${aide.montant} euros`,
          enSavoirPlus: aide.lien,
        };
      })
    );
  }
}
