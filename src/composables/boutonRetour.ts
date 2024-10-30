import { useRoute } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';
import { RouteUniversName } from '@/router/univers/routes';

export const useBoutonRetour = () => {
  if (useRoute().params.universId && useRoute().params.thematiqueId) {
    return {
      label: 'Revenir à la thématique',
      url: {
        name: RouteUniversName.THEMATIQUE,
        params: {
          id: useRoute().params.universId,
          thematique: useRoute().params.thematiqueId,
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
