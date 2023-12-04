import { SimulerAideRetrofitPresenter } from '@/aides/ports/simulerAideRetrofit.presenter';
import { SimulationRetrofit } from '@/aides/simulerAideRetrofit.usecase';
import { SimulationAideResultatViewModel, AideResultat } from '@/aides/ports/simulationAideResultat';

export class SimulerAideRetrofitPresenterImpl implements SimulerAideRetrofitPresenter {
  constructor(private _viewModel: (simulationAideResultatViewModel: SimulationAideResultatViewModel[]) => void) {}

  presente(simulationRetrofit: SimulationRetrofit): void {
    const simulationAideResultatViewModel: SimulationAideResultatViewModel[] = [];

    for (const category in simulationRetrofit) {
      const aides: AideResultat[] = simulationRetrofit[category].map(aide => ({
        libelle: aide.libelle,
        description: aide.description,
        lien: aide.lien,
        montant: Number(aide.montant),
        logo: aide.logo,
      }));

      const simulationAideResultat: SimulationAideResultatViewModel = {
        titre: `Prime au retrofit`,
        montantTotal: aides.reduce((total, aide) => total + aide.montant, 0),
        aides: aides,
      };

      simulationAideResultatViewModel.push(simulationAideResultat);
    }

    this._viewModel(simulationAideResultatViewModel);
  }
}
