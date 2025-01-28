import {
  AideResultat,
  AideResultats,
  SimulationAideResultatViewModel,
} from '@/domaines/aides/ports/simulationAideResultat';
import { SimulerAideVeloPresenter } from '@/domaines/aides/ports/simulerAideVelo.presenter';
import { AidesVelo, SimulationVelo, TypeVelos } from '@/domaines/aides/simulerAideVelo.usecase';

export class SimulerAideVeloPresenterImpl implements SimulerAideVeloPresenter {
  constructor(private _viewModel: (simulationAideResultatViewModel: SimulationAideResultatViewModel) => void) {}

  presente(simulationVelo: SimulationVelo): void {
    const simulationAideResultatViewModel: AideResultats[] = [];

    for (const typeVelo in simulationVelo) {
      const aides: AideResultat[] = simulationVelo[typeVelo].map((aide: AidesVelo) => ({
        libelle: aide.libelle,
        description: aide.description,
        lien: aide.lien,
        montant: aide.montant,
        logo: aide.logo,
      }));

      const simulationAideResultat: AideResultats = {
        titre: getTitre(typeVelo as TypeVelos),
        montantTotal: aides.reduce((total, aide) => total + Math.round(aide.montant), 0),
        aides: aides,
      };

      simulationAideResultatViewModel.push(simulationAideResultat);
    }

    const nombreAidesParCategory = simulationAideResultatViewModel.filter(elem => elem.aides.length > 0).length;
    const aucunResultat = nombreAidesParCategory === 0;

    this._viewModel({ resultats: simulationAideResultatViewModel, aucunResultat });
  }
}

function getTitre(category: TypeVelos): string {
  switch (category) {
    case 'électrique':
    case 'cargo électrique':
    case 'pliant électrique':
      return `Acheter un vélo ${category} ⚡️`;
    case 'adapté':
      return 'Acheter un vélo adapté (PMR) 🦽';
    case 'motorisation':
      return 'Transformer un vélo classique en vélo électrique 🔋';
    default:
      return `Acheter un vélo ${category}`;
  }
}
