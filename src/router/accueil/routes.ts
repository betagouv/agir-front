import { RouteRecordRaw } from 'vue-router';
const PageAccueilConnectee = () => import('@/components/pages/PageAccueilConnectee.vue');

export enum RouteAccueilName {
  COMMENCER = 'agir_v2',
}

const accueilRoutes: RouteRecordRaw[] = [
  {
    path: `/v2/agir`,
    name: RouteAccueilName.COMMENCER,
    component: PageAccueilConnectee,
    meta: {
      title: 'Agir',
    },
  },
];

export default accueilRoutes;
