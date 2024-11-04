import { useRoute } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';
import { RouteUniversName } from '@/router/univers/routes';

export const useBoutonRetour = () => {
  if (useRoute().params.universId && useRoute().params.missionId) {
    return {
      label: 'Revenir à la mission',
      url: {
        name: RouteUniversName.MISSION,
        params: {
          id: useRoute().params.universId,
          missionId: useRoute().params.missionId,
        },
      },
    };
  }
  return {
    url: {
      name: RouteCoachName.COACH,
    },
    label: "Revenir à l'accueil",
  };
};
