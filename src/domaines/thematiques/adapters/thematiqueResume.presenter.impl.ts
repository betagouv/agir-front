import { ResumeThematique, TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import {
  ThematiqueResumePresenter,
  ThematiqueResumeViewModel,
} from '@/domaines/thematiques/ports/thematiqueResume.presenter';
import { RouteActionsName } from '@/router/actions/routes';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteServiceName } from '@/router/services/routes';
import { gererPluriel } from '@/shell/pluriel';

export class ThematiqueResumePresenterImpl implements ThematiqueResumePresenter {
  constructor(private readonly _informationsPourThematique: (viewModel: ThematiqueResumeViewModel) => void) {}

  async presente(resumeThematique: ResumeThematique): Promise<void> {
    const listeRaccourcis: ThematiqueResumeViewModel['listeRaccourcis'] = [];

    if (resumeThematique.nbAides) {
      listeRaccourcis.push({
        emoji: '💶',
        to: {
          name: RouteAidesName.AIDES,
        },
        label: `${resumeThematique.nbAides} ${gererPluriel(resumeThematique.nbAides, 'aide', 'aides')} sur votre territoire`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.alimentation) {
      listeRaccourcis.push({
        emoji: '🥘',
        to: {
          name: RouteServiceName.RECETTES,
          params: {
            thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
          },
        },
        label: `1150 recettes délicieuses, saines et de saison`,
      });
      listeRaccourcis.push({
        emoji: '🍓',
        to: {
          name: RouteServiceName.FRUITS_ET_LEGUMES,
          params: {
            thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
          },
        },
        label: `1 calendrier de fruits et légumes de saison`,
      });
      listeRaccourcis.push({
        emoji: '🛒',
        to: {
          name: RouteServiceName.PROXIMITE,
          params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
        },
        label: `Des adresses pour manger local`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.logement) {
      listeRaccourcis.push({
        emoji: '🧱',
        href: 'https://mesaidesreno.beta.gouv.fr/',
        label: `1 simulateur Mes aides Rénovation`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.transports) {
      listeRaccourcis.push({
        emoji: '🚙',
        label: '1 simulateur Dois-je changer de voiture ?',
        to: {
          name: RouteActionsName.ACTION_INDIVIDUELLE,
          params: {
            type: TypeAction.SIMULATEUR,
            id: 'action_simulateur_voiture',
            titre: 'trouver-le-type-de-voiture-qui-vous-convient-le-mieux',
          },
        },
      });
      listeRaccourcis.push({
        emoji: '🚲',
        to: {
          name: RouteAidesName.VELO,
        },
        label: `1 simulateur aides vélo`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.consommation) {
      listeRaccourcis.push({
        emoji: '🔧',
        to: {
          name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
          params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
        },
        label: `Des adresses de réparateur près de chez moi`,
      });
    }

    this._informationsPourThematique({
      commune: resumeThematique.commune,
      listeRaccourcis: listeRaccourcis,
    });
  }
}
