import { RouteRecordRaw } from 'vue-router';

const collectivitesRoutes: RouteRecordRaw[] = [
  {
    path: '/collectivites',
    name: 'collectivites',
    component: () => import('@/components/pages/PageCollectivite.vue'),
    meta: {
      title: 'Accueil',
      estPublique: true,
    },
  },
];

export default collectivitesRoutes;
