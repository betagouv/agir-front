import { RouteRecordRaw } from 'vue-router';
const PageEstimationBilan = () => import('@/components/pages/PageEstimationBilan.vue');
const PageBilanCarbone = () => import('@/components/pages/PageBilanCarbone.vue');

export enum RouteBilanCarboneName {
  BILAN_CARBONE = 'bilan-carbone',
  BILAN_CARBONE_ENCHAINEMENT = 'bilan-carbone-enchainement',
}

export enum RouteBilanCarbonePath {
  BILAN_CARBONE = '/bilan-environnemental',
  BILAN_CARBONE_ENCHAINEMENT = '/bilan-environnemental/:thematiqueId/:id',
}

const bilanCarboneRoutes: RouteRecordRaw[] = [
  {
    path: RouteBilanCarbonePath.BILAN_CARBONE,
    name: RouteBilanCarboneName.BILAN_CARBONE,
    component: PageBilanCarbone,
    meta: {
      title: 'Mon empreinte écologique',
    },
  },
  {
    path: RouteBilanCarbonePath.BILAN_CARBONE_ENCHAINEMENT,
    name: RouteBilanCarboneName.BILAN_CARBONE_ENCHAINEMENT,
    component: PageEstimationBilan,
    meta: {
      title: 'Estimation de mon empreinte',
    },
  },
];

export default bilanCarboneRoutes;
