import { RouteRecordRaw } from 'vue-router';

export enum RouteCollectiviteName {
  LANDING = 'landing',
  CONTENUS = 'collectivitesEPCI',
}

const collectivitesRoutes: RouteRecordRaw[] = [
  {
    path: '/collectivites',
    name: RouteCollectiviteName.LANDING,
    component: () => import('@/components/pages/PageCollectivite.vue'),
    meta: {
      title: 'Collectivités',
      estPublique: true,
    },
  },
  {
    path: '/collectivites/contenus',
    name: RouteCollectiviteName.CONTENUS,
    component: () => import('@/components/pages/PageCollectiviteEPCI.vue'),
    meta: {
      title: 'Collectivités',
      estPublique: true,
    },
  },
];

export default collectivitesRoutes;
