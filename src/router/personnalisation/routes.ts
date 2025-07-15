import { RouteRecordRaw } from 'vue-router';
const PagePersonnalisation = () => import('@/components/pages/PagePersonnalisation.vue');

export enum RoutePersonnalisationName {
  PERSONNALISATION = 'personnalisation',
}

export enum RoutePersonnalisationPath {
  PERSONNALISATION = '/personnalisation/',
}
const personnalisationRoutes: RouteRecordRaw[] = [
  {
    path: RoutePersonnalisationPath.PERSONNALISATION,
    name: RoutePersonnalisationName.PERSONNALISATION,
    component: PagePersonnalisation,
    meta: {
      title: 'Tester la personnalisation',
    },
  },
];

export default personnalisationRoutes;
