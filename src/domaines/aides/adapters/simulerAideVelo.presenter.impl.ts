import {
  AideResultat,
  AideResultats,
  SimulationAideResultatViewModel,
} from '@/domaines/aides/ports/simulationAideResultat';
import { SimulerAideVeloPresenter } from '@/domaines/aides/ports/simulerAideVelo.presenter';
import { SimulationVelo } from '@/domaines/aides/simulerAideVelo.usecase';

export class SimulerAideVeloPresenterImpl implements SimulerAideVeloPresenter {
  constructor(private _viewModel: (simulationAideResultatViewModel: SimulationAideResultatViewModel) => void) {}

  presente(simulationVelo: SimulationVelo): void {
    const simulationAideResultatViewModel: AideResultats[] = [];

    for (const category in simulationVelo) {
      const aides: AideResultat[] = simulationVelo[category].map(aide => ({
        libelle: aide.libelle,
        description: aide.description,
        lien: aide.lien,
        montant: aide.montant,
        logo: aide.logo,
      }));

      const simulationAideResultat: AideResultats = {
        titre: `Acheter un vélo ${category}`,
        montantTotal: aides.reduce((total, aide) => total + aide.montant, 0),
        aides: aides,
      };

      simulationAideResultatViewModel.push(simulationAideResultat);
    }

    const nombreAidesParCategory = simulationAideResultatViewModel.filter(elem => elem.aides.length > 0).length;
    const aucunResultat = nombreAidesParCategory === 0;

    this._viewModel({ resultats: simulationAideResultatViewModel, aucunResultat });
  }
}
