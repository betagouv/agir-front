import { RouteRecordRaw } from 'vue-router';

export enum RouteResetName {
  RESET_1 = 'reset-1',
  RESET_2 = 'reset-2',
}

export enum RouteResetPath {
  RESET_1 = '/nouvelle-version/',
  RESET_2 = '/nouvelle-version/2',
}

const collectivitesRoutes: RouteRecordRaw[] = [
  {
    path: RouteResetPath.RESET_1,
    name: RouteResetName.RESET_1,
    component: () => import('@/components/pages/PagePostResetEtape1.vue'),
    meta: {
      title: 'Il y a du nouveau',
      estPublique: false,
    },
  },
  {
    path: RouteResetPath.RESET_2,
    name: RouteResetName.RESET_2,
    component: () => import('@/components/pages/PagePostResetEtape2.vue'),
    meta: {
      title: 'Merci pour votre soutien',
      estPublique: false,
    },
  },
];

export default collectivitesRoutes;
