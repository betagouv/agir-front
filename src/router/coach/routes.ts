const PageBibliotheque = () => import('@/components/pages/PageBibliotheque.vue');
const PageSeDesabonnerDesNotificationsMails = () =>
  import('@/components/pages/PageSeDesabonnerDesNotificationsMails.vue');
const PageAccueilConnectee = () => import('@/components/pages/PageAccueilConnectee.vue');

import { RouteRecordRaw } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';

export enum RouteCoachPath {
  ACCUEIL_CONNECTEE = '/agir',
  BIBLIOTHEQUE = 'bibliotheque',
  SE_DESABONNER_DES_NOTIFICATIONS_MAILS = '/se-desabonner',
}

const coachRoutes: RouteRecordRaw[] = [
  {
    path: RouteCoachPath.ACCUEIL_CONNECTEE,
    children: [
      {
        path: RouteCoachPath.ACCUEIL_CONNECTEE,
        name: RouteCoachName.ACCUEIL_CONNECTEE,
        component: PageAccueilConnectee,
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
  {
    path: RouteCoachPath.SE_DESABONNER_DES_NOTIFICATIONS_MAILS,
    component: PageSeDesabonnerDesNotificationsMails,
    meta: {
      title: 'Se désabonner des notifications mails',
      estPublique: true,
    },
  },
];

export default coachRoutes;
