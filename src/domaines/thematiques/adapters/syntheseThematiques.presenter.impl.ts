import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import {
  SyntheseThematiquePresenter,
  SyntheseThematiquesViewModel,
} from '@/domaines/thematiques/ports/syntheseThematique.presenter';
import { SyntheseThematiques } from '@/domaines/thematiques/ports/thematiques.repository';
import { gererPluriel } from '@/shell/formatting/gererPluriel';

type Bulletpoint = { nombre: number; phrase: { singulier: string; pluriel: string } };

export class SyntheseThematiquesPresenterImpl implements SyntheseThematiquePresenter {
  constructor(private readonly _syntheseThematiquesViewModel: (viewModel: SyntheseThematiquesViewModel) => void) {}

  async presente(synthese: SyntheseThematiques): Promise<void> {
    this._syntheseThematiquesViewModel({
      commune: synthese.commune,
      cartesThematiques: synthese.listeThematiques.map(thematiqueData => {
        const thematique = MenuThematiques.getThematiqueData(thematiqueData.thematique as ClefThematiqueAPI);

        const points: Bulletpoint[] = [
          this.creerPointSimulateurConditionnellement(
            thematique.clefTechniqueAPI as ClefThematiqueAPI,
            thematiqueData.nombreSimulateurs,
          ),
          {
            nombre: thematiqueData.nombreRecettes,
            phrase: {
              singulier: 'recette délicieuse, saine et de saison',
              pluriel: 'recettes délicieuses, saines et de saison',
            },
          },
          {
            nombre: thematiqueData.nombreAides,
            phrase: {
              singulier: 'aide sur votre territoire',
              pluriel: 'aides sur votre territoire',
            },
          },
          {
            nombre: thematiqueData.nombreActions,
            phrase: {
              singulier: "idée d'actions",
              pluriel: "idées d'actions",
            },
          },
        ];

        const bulletPoints: string[] = this.transformerEnHTML(points);
        const titreHTML = `<span aria-hidden="true">${thematique.emoji}</span>&nbsp ${thematique.labelDansLeMenu}`;

        return {
          id: thematique.url,
          titreHTML,
          bulletPoints,
        };
      }),
    });
  }

  private creerPointSimulateurConditionnellement(clefTechniqueAPI: ClefThematiqueAPI, nombreSimulateurs: number) {
    if (clefTechniqueAPI === ClefThematiqueAPI.logement) {
      return {
        nombre: nombreSimulateurs,
        phrase: { singulier: 'simulateur Mes Aides Réno', pluriel: 'simulateurs Mes Aides Réno' },
      };
    } else if (clefTechniqueAPI === ClefThematiqueAPI.transports) {
      return {
        nombre: nombreSimulateurs,
        phrase: { singulier: 'simulateur vélo et voiture', pluriel: 'simulateurs vélo et voiture' },
      };
    } else {
      return {
        nombre: nombreSimulateurs,
        phrase: { singulier: 'simulateur', pluriel: 'simulateurs' },
      };
    }
  }

  private transformerEnHTML(points: Bulletpoint[]): string[] {
    return points
      .filter(({ nombre }) => nombre !== 0 && nombre !== undefined)
      .map(({ nombre, phrase }): string => {
        return `<span class="text--bold">${nombre}</span> ${gererPluriel(nombre, phrase.singulier, phrase.pluriel)}`;
      });
  }
}
