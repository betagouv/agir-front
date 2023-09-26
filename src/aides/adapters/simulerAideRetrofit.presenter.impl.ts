import { SimulerAideRetrofitPresenter } from '@/aides/ports/simulerAideRetrofit.presenter';
import { SimulationRetrofit } from '@/aides/simulerAideRetrofit.usecase';
import { SimulationAideResultatViewModel, AideResultat } from '@/aides/ports/simulationAideResultat';

export class SimulerAideRetrofitPresenterImpl implements SimulerAideRetrofitPresenter {
  constructor(private _viewModel: (simulationAideResultatViewModel: SimulationAideResultatViewModel) => void) {}

  presente(simulationRetrofit: SimulationRetrofit): void {
    const aidesResultatRetrofit: AideResultat[] = simulationRetrofit.aides.map(aide => ({
      libelle: aide.libelle,
      montant: Number(aide.montant),
      lien: aide.lien,
      logo: 'to define',
    }));

    this._viewModel({
      'Prime au retrofit': aidesResultatRetrofit,
    });
  }
}
