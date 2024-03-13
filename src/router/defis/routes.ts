import { RouteRecordRaw } from 'vue-router';
const PageQuestionDefi = () => import('@/components/pages/PageQuestionDefi.vue');

export enum RouteDefiName {
  DEFI = 'defi',
}
export enum RouteDefiPath {
  DEFI = '/defi/',
}
const defiRoutes: RouteRecordRaw[] = [
  {
    path: '/defi/:id',
    name: RouteDefiName.DEFI,
    component: PageQuestionDefi,
  },
];

export default defiRoutes;
