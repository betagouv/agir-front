import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import {
  SyntheseThematiquePresenter,
  SyntheseThematiquesViewModel,
} from '@/domaines/thematiques/ports/syntheseThematique.presenter';
import { SyntheseThematiques } from '@/domaines/thematiques/ports/thematique.repository';

export class SyntheseThematiquesPresenterImpl implements SyntheseThematiquePresenter {
  constructor(private readonly _syntheseThematiquesViewModel: (viewModel: SyntheseThematiquesViewModel) => void) {}

  async presente(synthese: SyntheseThematiques): Promise<void> {
    this._syntheseThematiquesViewModel({
      commune: synthese.commune,
      cartesThematiques: synthese.listeThematiques.map(thematiqueData => {
        const thematique = MenuThematiques.getThematiqueData(thematiqueData.thematique as ClefThematiqueAPI);

        const bulletPoints: string[] = [];
        if (thematique.clefTechniqueAPI === ClefThematiqueAPI.alimentation && thematiqueData.nombreRecettes) {
          bulletPoints.push(
            `<span class="text--bold">${thematiqueData.nombreRecettes}</span> recettes délicieuses, saines et de saison`,
          );
        } else if (thematique.clefTechniqueAPI === ClefThematiqueAPI.logement) {
          bulletPoints.push(
            `<span class="text--bold">${thematiqueData.nombreSimulateurs}</span> simulateur Mes Aides Rénov`,
          );
        } else if (thematique.clefTechniqueAPI === ClefThematiqueAPI.transports) {
          bulletPoints.push(
            `<span class="text--bold">${thematiqueData.nombreSimulateurs}</span> simulateurs vélo et voiture`,
          );
        }

        if (thematiqueData.nombreAides) {
          bulletPoints.push(`<span class="text--bold">${thematiqueData.nombreAides}</span> aides sur votre territoire`);
        }

        if (thematiqueData.nombreActions) {
          bulletPoints.push(`<span class="text--bold">${thematiqueData.nombreActions}</span> idées d'actions`);
        }

        return {
          id: thematique.url,
          titreHTML: `<span aria-hidden="true">${thematique.emoji}</span>&nbsp ${thematique.labelDansLeMenu}`,
          bulletPoints,
        };
      }),
    });
  }
}
