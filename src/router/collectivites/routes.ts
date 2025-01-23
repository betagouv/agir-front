import { RouteRecordRaw } from 'vue-router';

const collectivitesRoutes: RouteRecordRaw[] = [
  {
    path: '/collectivites',
    name: 'collectivites',
    component: () => import('@/components/pages/PageCollectivite.vue'),
    meta: {
      title: 'Commune',
      estPublique: true,
    },
  },
  {
    path: '/collectivitesEPCI',
    name: 'collectivitesEPCI',
    component: () => import('@/components/pages/PageCollectiviteEPCI.vue'),
    meta: {
      title: 'Commune et collectivités',
      estPublique: true,
    },
  },
];

export default collectivitesRoutes;
