const Coach = () => import('@/components/Coach.vue');
const PageBibliotheque = () => import('@/components/pages/PageBibliotheque.vue');

import { RouteRecordRaw } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';

export enum RouteCoachPath {
  COACH = '/agir',
  SERVICES = 'services',
  SUIVI_DU_JOUR = 'suivi-du-jour',
  BIBLIOTHEQUE = 'bibliotheque',
}

const coachRoutes: RouteRecordRaw[] = [
  {
    path: RouteCoachPath.COACH,
    children: [
      {
        path: RouteCoachPath.COACH,
        name: RouteCoachName.COACH,
        component: Coach,
        meta: {
          title: 'Agir',
        },
      },
      {
        path: RouteCoachPath.BIBLIOTHEQUE,
        name: RouteCoachName.BIBLIOTHEQUE,
        component: PageBibliotheque,
        meta: {
          title: 'Bibliothèque',
        },
      },
    ],
  },
];

export default coachRoutes;
