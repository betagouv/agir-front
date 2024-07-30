const Coach = () => import('@/components/Coach.vue');
const PageBibliotheque = () => import('@/components/pages/PageBibliotheque.vue');
const PageLinky = () => import('@/components/pages/PageLinky.vue');
const PageClassement = () => import('@/components/pages/PageClassement.vue');

import { RouteRecordRaw } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';

export enum RouteCoachPath {
  COACH = '/agir',
  SERVICES = 'services',
  SERVICES_LINKY = '/agir/services/linky',
  SUIVI_DU_JOUR = 'suivi-du-jour',
  BIBLIOTHEQUE = 'bibliotheque',
  CLASSEMENT = 'classement',
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
        path: RouteCoachPath.SERVICES_LINKY,
        name: RouteCoachName.SERVICES_LINKY,
        component: PageLinky,
        meta: {
          title: 'Service Linky',
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
      {
        path: RouteCoachPath.CLASSEMENT,
        name: RouteCoachName.CLASSEMENT,
        component: PageClassement,
        meta: {
          title: 'Classement',
        },
      },
    ],
  },
];

export default coachRoutes;
