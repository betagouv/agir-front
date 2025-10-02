import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { RaccourciViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';
import { RouteActionsName } from '@/router/actions/routes';
import { RouteAidesName } from '@/router/aides/routeAidesName';
import { RouteServiceName } from '@/router/services/routes';
import { gererPluriel } from '@/shell/gererPluriel';
import { NombreAfficheEnFRBuilder } from '@/shell/nombreAfficheEnFRBuilder';

export class Raccourcis {
  static serviceProximite: RaccourciViewModel = {
    emoji: '🛒',
    label: 'Des adresses pour manger local',
    to: {
      name: RouteServiceName.PROXIMITE,
      params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
    },
  };

  static serviceRecettes = (nbRecettes: number): RaccourciViewModel => ({
    emoji: '🥘',
    label: `${NombreAfficheEnFRBuilder.build(nbRecettes)} recettes délicieuses, saines et de saison`,
    to: {
      name: RouteServiceName.RECETTES,
      params: {
        thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
      },
    },
  });

  static serviceFruitsEtLegumes: RaccourciViewModel = {
    emoji: '🍓',
    label: `1 calendrier de fruits et légumes de saison`,
    to: {
      name: RouteServiceName.FRUITS_ET_LEGUMES,
      params: {
        thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
      },
    },
  };

  static serviceLongueVieAuxObjets: RaccourciViewModel = {
    emoji: '🔧',
    label: 'Des points de réparation près de chez moi',
    to: {
      name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
      params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
    },
  };

  static aides = (nbAides: number): RaccourciViewModel => ({
    emoji: '💶',
    label: `${NombreAfficheEnFRBuilder.build(nbAides)} ${gererPluriel(nbAides, 'aide financière', 'aides financières')} sur votre territoire`,
    to: {
      name: RouteAidesName.AIDES,
    },
  });

  static simulateurMesAidesVelo: RaccourciViewModel = {
    emoji: '🚲',
    label: `1 simulateur Mes Aides Vélo`,
    to: {
      name: RouteAidesName.VELO,
    },
  };

  static actionMesAidesReno: RaccourciViewModel = {
    emoji: '🧱',
    label: `1 simulateur Mes Aides Réno`,
    to: {
      name: RouteActionsName.ACTION_INDIVIDUELLE,
      params: {
        type: TypeAction.SIMULATEUR,
        id: 'simu_aides_reno',
        titre: 'calculer-vos-aides-pour-renover-votre-logement',
      },
    },
  };

  static actionSimulateurVoiture: RaccourciViewModel = {
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
  };
}
