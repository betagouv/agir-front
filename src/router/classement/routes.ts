import { RouteRecordRaw } from 'vue-router';
const PageClassement = () => import('@/components/pages/PageClassement.vue');

export enum RouteClassementName {
  CLASSEMENT = 'classement',
}

export enum RouteClassementPath {
  CLASSEMENT = '/classement',
}

const classementRoutes: RouteRecordRaw[] = [
  {
    path: RouteClassementPath.CLASSEMENT,
    name: RouteClassementName.CLASSEMENT,
    component: PageClassement,
    meta: {
      title: 'Classement',
    },
  },
];

export default classementRoutes;
