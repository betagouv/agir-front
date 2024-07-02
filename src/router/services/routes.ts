import { RouteRecordRaw } from 'vue-router';

const PageService = () => import('@/components/pages/PageService.vue');
const PageServiceFruitsEtLegumes = () => import('@/components/pages/PageServiceFruitsEtLegumes.vue');

export enum RouteServiceName {
  SERVICE = 'service',
  SERVICE_FRUITS_ET_LEGUMES = 'fruits-et-legumes',
}

export enum RouteServicePath {
  SERVICE = '/service/',
  SERVICE_FRUITS_ET_LEGUMES = '/service/fruits-et-legumes',
}

const serviceRoutes: RouteRecordRaw[] = [
  {
    path: RouteServicePath.SERVICE,
    name: RouteServiceName.SERVICE,
    component: PageService,
    meta: {
      title: 'Service',
    },
  },
  {
    path: RouteServicePath.SERVICE_FRUITS_ET_LEGUMES,
    name: RouteServiceName.SERVICE_FRUITS_ET_LEGUMES,
    component: PageServiceFruitsEtLegumes,
    meta: {
      title: 'Service : fruits et légumes',
    },
  },
];

export default serviceRoutes;
