import {
  AccueilConnectePresenter,
  AccueilConnecteViewModel,
} from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
import { AccueilConnecte } from '@/domaines/accueilConnecte/ports/accueilConnecte.repository';
import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { RouteActionsName } from '@/router/actions/routes';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteServiceName } from '@/router/services/routes';
import { gererPluriel } from '@/shell/pluriel';

export class AccueilConnectePresenterImpl implements AccueilConnectePresenter {
  constructor(private readonly accueilConnecteViewModel: (viewModel: AccueilConnecteViewModel) => void) {}

  presente(accueilConnecte: AccueilConnecte): void {
    this.accueilConnecteViewModel({
      commune: accueilConnecte.commune,
      progression: {
        nombreActionsTerminees: accueilConnecte.totalActionsUtilisateurFaites,
        pourcentageCompletionBilan: accueilConnecte.pourcentageCompletionBilan,
        tonneBilan: Math.round(accueilConnecte.bilanCarboneTotalKg / 1000).toString(),
      },
      raccourcis: [
        {
          emoji: '🛒',
          label: 'Des adresses pour manger local',
          to: {
            name: RouteServiceName.PROXIMITE,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
          },
        },
        {
          emoji: '💶',
          label: `${accueilConnecte.nombreAides} ${gererPluriel(accueilConnecte.nombreAides, 'aide financière', 'aides financières')} sur votre territoire`,
          to: {
            name: RouteAidesName.AIDES,
          },
        },
        {
          emoji: '🚲',
          label: `1 simulateur Mes aides vélo`,
          to: {
            name: RouteAidesName.VELO,
          },
        },
        {
          emoji: '🧱',
          label: `1 simulateur Mes aides Rénov`,
          href: 'https://mesaidesreno.beta.gouv.fr/',
        },
        {
          emoji: '🥘',
          label: `${accueilConnecte.nombreRecettes} recettes délicieuses, saines et de saison`,
          to: {
            name: RouteServiceName.RECETTES,
            params: {
              thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
            },
          },
        },
        {
          emoji: '🚙',
          label: '1 simulateur Changer de voiture',
          to: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              type: TypeAction.SIMULATEUR,
              id: 'action_simulateur_voiture',
              titre: 'trouver-le-type-de-voiture-qui-vous-convient-le-mieux',
            },
          },
        },
        {
          emoji: '🍓',
          label: `1 Calendrier de fruits et légumes de saison`,
          to: {
            name: RouteServiceName.FRUITS_ET_LEGUMES,
            params: {
              thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
            },
          },
        },
        {
          emoji: '🔧',
          label: 'Des points de réparation près de chez moi',
          to: {
            name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
          },
        },
      ],
      totalActionsRealisees: accueilConnecte.totalActionsNationalesFaites,
    });
  }
}
