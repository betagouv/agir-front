import { RouteRecordRaw } from 'vue-router';
const PageQuestionDefi = () => import('@/components/pages/PageQuestionDefi.vue');

export enum RouteDefiName {
  DEFI = 'defi',
  DEFI_THEMATIQUE = 'defi-thematique',
}
export enum RouteDefiPath {
  DEFI = '/defi/',
}
const defiRoutes: RouteRecordRaw[] = [
  {
    path: `${RouteDefiPath.DEFI}:id`,
    name: RouteDefiName.DEFI,
    component: PageQuestionDefi,
  },
  {
    path: `${RouteDefiPath.DEFI}:universId/:missionId/:id`,
    name: RouteDefiName.DEFI_THEMATIQUE,
    component: PageQuestionDefi,
  },
];

export default defiRoutes;
