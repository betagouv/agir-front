import { AideResultat, SimulationAideResultatViewModel } from '@/aides//ports/simulationAideResultat';
import { SimulerAideVeloPresenter } from '@/aides/ports/simulerAideVelo.presenter';
import { SimulationVelo } from '@/aides/simulerAideVelo.usecase';

export class SimulerAideVeloPresenterImpl implements SimulerAideVeloPresenter {
  constructor(private _viewModel: (simulationAideResultatViewModel: SimulationAideResultatViewModel[]) => void) {}

  presente(simulationVelo: SimulationVelo): void {
    const simulationAideResultatViewModel: SimulationAideResultatViewModel[] = [];

    for (const category in simulationVelo) {
      const aides: AideResultat[] = simulationVelo[category].map(aide => ({
        libelle: aide.libelle,
        description: aide.description,
        lien: aide.lien,
        montant: aide.montant,
        logo: aide.logo,
      }));

      const simulationAideResultat: SimulationAideResultatViewModel = {
        titre: `Acheter un vélo ${category}`,
        montantTotal: aides.reduce((total, aide) => total + aide.montant, 0),
        aides: aides,
      };

      simulationAideResultatViewModel.push(simulationAideResultat);
    }

    this._viewModel(simulationAideResultatViewModel);
  }
}
