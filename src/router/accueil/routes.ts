import { RouteRecordRaw } from 'vue-router';
const PageParOuCommencer = () => import('@/components/pages/PageParOuCommencer.vue');

export enum RouteAccueilName {
  COMMENCER = 'agir_v2',
}

const accueilRoutes: RouteRecordRaw[] = [
  {
    path: `/v2/agir`,
    name: RouteAccueilName.COMMENCER,
    component: PageParOuCommencer,
    meta: {
      title: 'Thématique',
    },
  },
];

export default accueilRoutes;
