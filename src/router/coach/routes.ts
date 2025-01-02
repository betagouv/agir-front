const Coach = () => import('@/components/Coach.vue');
const PageBibliotheque = () => import('@/components/pages/PageBibliotheque.vue');
const PageSeDesabonnerDesNotificationsMails = () =>
  import('@/components/pages/PageSeDesabonnerDesNotificationsMails.vue');
import { RouteRecordRaw } from 'vue-router';
import { RouteCoachName } from '@/router/coach/routeCoachName';

export enum RouteCoachPath {
  COACH = '/agir',
  BIBLIOTHEQUE = 'bibliotheque',
  SE_DESABONNER_DES_NOTIFICATIONS_MAILS = '/se-desabonner',
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
