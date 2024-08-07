import { RouteRecordRaw } from 'vue-router';

const PageServiceRecettes = () => import('@/components/pages/PagesService/PageServiceRecettes.vue');
const PageServicePresDeChezNous = () => import('@/components/pages/PagesService/PageServicePresDeChezNous.vue');
const PageServiceFruitsEtLegumes = () => import('@/components/pages/PagesService/PageServiceFruitsEtLegumes.vue');

export enum RouteServiceName {
  RECETTES = 'recettes',
  PROXIMITE = 'pres-de-chez-nous',
  SERVICE_FRUITS_ET_LEGUMES = 'fruits-et-legumes',
}

export enum RouteServicePath {
  RECETTES = '/service/recettes',
  PROXIMITE = '/service/pres-de-chez-nous',
  SERVICE_FRUITS_ET_LEGUMES = '/service/fruits-et-legumes',
}

const serviceRoutes: RouteRecordRaw[] = [
  {
    path: RouteServicePath.RECETTES,
    name: RouteServiceName.RECETTES,
    component: PageServiceRecettes,
    meta: {
      title: 'Service : Recettes',
    },
  },
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
