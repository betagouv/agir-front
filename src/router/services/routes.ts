import { RouteRecordRaw } from 'vue-router';

const PageService = () => import('@/components/pages/PageService.vue');

export enum RouteServiceName {
  SERVICE = 'service',
}

export enum RouteServicePath {
  SERVICE = '/service/',
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
];

export default serviceRoutes;
