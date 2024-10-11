import { RouteRecordRaw } from 'vue-router';
const PageBilanUnivers = () => import('@/components/pages/PageBilanUnivers.vue');
const PageBilanCarbone = () => import('@/components/pages/PageBilanCarbone.vue');

export enum RouteBilanCarboneName {
  BILAN_CARBONE = 'bilan-carbone',
  BILAN_CARBONE_ENCHAINEMENT = 'bilan-carbone-enchainement',
}

export enum RouteBilanCarbonePath {
  BILAN_CARBONE = '/bilan-environnemental',
  BILAN_CARBONE_ENCHAINEMENT = '/bilan-environnemental/:univers/:id',
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
  {
    path: RouteBilanCarbonePath.BILAN_CARBONE_ENCHAINEMENT,
    name: RouteBilanCarboneName.BILAN_CARBONE_ENCHAINEMENT,
    component: PageBilanUnivers,
    meta: {
      title: 'Estimation du bilan',
    },
  },
];

export default bilanCarboneRoutes;
