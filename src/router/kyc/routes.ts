import { RouteRecordRaw } from 'vue-router';
import PageQuestionKyc from '@/components/pages/PageQuestionKyc.vue';

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
