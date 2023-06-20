import { SimulationAidesRetrofitViewModel, SimulerAideRetrofitPresenter } from "@/aides/ports/simulerAideRetrofit.presenter";
import { SimulationRetrofit } from "@/aides/simulerAideRetrofit.usecase";

export class SimulerAideRetrofitPresenterImpl implements SimulerAideRetrofitPresenter {
  private _viewModel: (simulationAidesRetrofitViewModel: SimulationAidesRetrofitViewModel[]) => void;
  constructor(viewModel: (simulationAidesRetrofitViewModel: SimulationAidesRetrofitViewModel[]) => void) {
    this._viewModel = viewModel;
  }

  presente(simulationRetrofit: SimulationRetrofit): void {
    this._viewModel(
      simulationRetrofit.aides.map((aide) => {
        return {
          libelle: aide.libelle,
          montant: `${aide.montant} euros`,
        };
      })
    );
  }
}
