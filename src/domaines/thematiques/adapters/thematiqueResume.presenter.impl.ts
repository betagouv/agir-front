import { ResumeThematique } from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import {
  ThematiqueResumePresenter,
  ThematiqueResumeViewModel,
} from '@/domaines/thematiques/ports/thematiqueResume.presenter';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteServiceName } from '@/router/services/routes';
import { gererPluriel } from '@/shell/pluriel';

export class ThematiqueResumePresenterImpl implements ThematiqueResumePresenter {
  constructor(private readonly _informationsPourThematique: (viewModel: ThematiqueResumeViewModel) => void) {}

  async presente(resumeThematique: ResumeThematique): Promise<void> {
    const listeInformations: ThematiqueResumeViewModel['listeInformations'] = [];

    if (resumeThematique.nbAides) {
      listeInformations.push({
        to: {
          name: RouteAidesName.AIDES,
        },
        label: `${resumeThematique.nbAides} ${gererPluriel(resumeThematique.nbAides, 'aide', 'aides')} sur votre territoire`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.alimentation) {
      listeInformations.push({
        to: {
          name: RouteServiceName.RECETTES,
          params: {
            thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
          },
        },
        label: `1150 recettes délicieuses, saines et de saison`,
      });
      listeInformations.push({
        to: {
          name: RouteServiceName.FRUITS_ET_LEGUMES,
          params: {
            thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
          },
        },
        label: `1 calendrier de fruits et légumes de saison`,
      });
      listeInformations.push({
        to: {
          name: RouteServiceName.PROXIMITE,
          params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
        },
        label: `Des adresses pour manger local`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.logement) {
      listeInformations.push({
        href: 'https://mesaidesreno.beta.gouv.fr/',
        label: `1 simulateur Mes aides Rénovation`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.transports) {
      listeInformations.push({
        href: 'https://jechangemavoiture.gouv.fr/jcmv/',
        label: `1 simulateur Dois-je changer de voiture ?`,
      });
      listeInformations.push({
        to: {
          name: RouteAidesName.VELO,
        },
        label: `1 simulateur aides vélo`,
      });
    }

    if (resumeThematique.thematique === ClefThematiqueAPI.consommation) {
      listeInformations.push({
        to: {
          name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
          params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
        },
        label: `Des adresses de réparateur près de chez moi`,
      });
    }

    this._informationsPourThematique({
      commune: resumeThematique.commune,
      listeInformations,
    });
  }
}
