import { RouteRecordRaw } from 'vue-router';
const PageBilanCarbone = () => import('@/components/pages/PageBilanCarbone.vue');

export enum RouteBilanCarboneName {
  BILAN_CARBONE = 'bilan-carbone',
}

export enum RouteBilanCarbonePath {
  BILAN_CARBONE = '/bilan-carbone',
}

const bilanCarboneRoutes: RouteRecordRaw[] = [
  {
    path: RouteBilanCarbonePath.BILAN_CARBONE,
    name: RouteBilanCarboneName.BILAN_CARBONE,
    component: PageBilanCarbone,
    meta: {
      title: 'Mon bilan environnemental',
    },
  },
];

export default bilanCarboneRoutes;
