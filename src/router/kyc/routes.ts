import { RouteRecordRaw } from 'vue-router';
const PageQuestionKyc = () => import('@/components/pages/PageQuestionKyc.vue');

export enum RouteKycName {
  KYC = 'kyc',
  KYC_COMPTE = 'kyc-compte',
}

export enum RouteKycPath {
  KYC = '/mieux-vous-connaitre/',
  KYC_COMPTE = '/compte/mieux-vous-connaitre/',
}
const kycRoutes: RouteRecordRaw[] = [
  {
    path: `${RouteKycPath.KYC_COMPTE}:id`,
    name: RouteKycName.KYC_COMPTE,
    component: PageQuestionKyc,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
  {
    path: `${RouteKycPath.KYC}:id`,
    name: RouteKycName.KYC,
    component: PageQuestionKyc,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
];

export default kycRoutes;
