import { RouteRecordRaw } from 'vue-router';

export enum RouteCollectiviteName {
  COLLECTIVITE_V2 = 'collectivitesEPCI',
}

const collectivitesRoutes: RouteRecordRaw[] = [
  {
    path: '/collectivites',
    name: RouteCollectiviteName.COLLECTIVITE_V2,
    component: () => import('@/components/pages/PageCollectiviteEPCI.vue'),
    meta: {
      title: 'Collectivités',
      estPublique: true,
    },
  },
];

export default collectivitesRoutes;
