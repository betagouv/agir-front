import { RouteRecordRaw } from 'vue-router';
const PageQuestionKyc = () => import('@/components/pages/PageQuestionKyc.vue');

export enum RouteKycName {
  KYC = 'kyc',
}

export enum RouteKycPath {
  KYC = '/mieux-vous-connaitre/',
}
const kycRoutes: RouteRecordRaw[] = [
  {
    path: `/${RouteKycPath.KYC}/:id`,
    name: RouteKycName.KYC,
    component: PageQuestionKyc,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
];

export default kycRoutes;
