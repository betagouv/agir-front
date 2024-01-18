import { RouteRecordRaw } from 'vue-router';
const PageQuestionKyc = import('@/components/pages/PageQuestionKyc.vue');

export enum RouteKycName {
  KYC = 'kyc',
}
const kycRoutes: RouteRecordRaw[] = [
  {
    path: '/kyc/:id',
    name: RouteKycName.KYC,
    component: PageQuestionKyc,
  },
];

export default kycRoutes;
