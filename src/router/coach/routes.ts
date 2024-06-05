const Coach = () => import('@/components/Coach.vue');
const PageCatalogueServices = () => import('@/components/pages/PageCatalogueServices.vue');
const PageBibliotheque = () => import('@/components/pages/PageBibliotheque.vue');
const PageLinky = () => import('@/components/pages/PageLinky.vue');

import { RouteRecordRaw } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';

export enum RouteCoachPath {
  COACH = '/agir/',
  SERVICES = 'services',
  SERVICES_LINKY = '/agir/services/linky',
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
        path: RouteCoachPath.SERVICES,
        name: RouteCoachName.SERVICES,
        component: PageCatalogueServices,
        meta: {
          title: 'Catalogue de services',
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
    ],
  },
];

export default coachRoutes;
