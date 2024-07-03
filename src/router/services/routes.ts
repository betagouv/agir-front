import { RouteRecordRaw } from 'vue-router';

const PageServicePresDeChezNous = () => import('@/components/pages/PageServicePresDeChezNous.vue');
const PageServiceFruitsEtLegumes = () => import('@/components/pages/PageServiceFruitsEtLegumes.vue');

export enum RouteServiceName {
  PROXIMITE = 'pres-de-chez-nous',
  SERVICE_FRUITS_ET_LEGUMES = 'fruits-et-legumes',
}

export enum RouteServicePath {
  PROXIMITE = '/service/pres-de-chez-nous',
  SERVICE_FRUITS_ET_LEGUMES = '/service/fruits-et-legumes',
}

const serviceRoutes: RouteRecordRaw[] = [
  {
    path: RouteServicePath.PROXIMITE,
    name: RouteServiceName.PROXIMITE,
    component: PageServicePresDeChezNous,
    meta: {
      title: 'Service : Près de chez nous',
    },
  },
  {
    path: RouteServicePath.SERVICE_FRUITS_ET_LEGUMES,
    name: RouteServiceName.SERVICE_FRUITS_ET_LEGUMES,
    component: PageServiceFruitsEtLegumes,
    meta: {
      title: 'Service : Fruits et légumes',
    },
  },
];

export default serviceRoutes;
