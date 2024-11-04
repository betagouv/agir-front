import { useRoute } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';
import { RouteThematiquesName } from '@/router/univers/routes';

export const useBoutonRetour = () => {
  if (useRoute().params.thematiqueId && useRoute().params.missionId) {
    return {
      label: 'Revenir à la mission',
      url: {
        name: RouteThematiquesName.MISSION,
        params: {
          id: useRoute().params.thematiqueId,
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
