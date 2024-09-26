import { RouteRecordRaw } from 'vue-router';
const PageQuestionsKYCOnboarding = () => import('@/components/pages/PageQuestionsKYCOnboarding.vue');
const PageQuestionKyc = () => import('@/components/pages/PageQuestionKyc.vue');
const PageThematiqueQuestionsKyc = () => import('@/components/pages/PageThematiqueQuestionsKyc.vue');

export enum RouteKycName {
  KYC = 'kyc',
  KYC_THEMATIQUE = 'kyc-thematique',
  KYC_ONBOARDING = 'kyc-thematique-onboarding',
}

export enum RouteKycPath {
  KYC = '/mieux-vous-connaitre/',
  KYC_ONBOARDING = '/mission/mieux-vous-connaitre/',
}
const kycRoutes: RouteRecordRaw[] = [
  {
    path: `${RouteKycPath.KYC}:id`,
    name: RouteKycName.KYC,
    component: PageQuestionKyc,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
  {
    path: `${RouteKycPath.KYC}:universId/:thematiqueId`,
    name: RouteKycName.KYC_THEMATIQUE,
    component: PageThematiqueQuestionsKyc,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
  {
    path: `/${RouteKycPath.KYC_ONBOARDING}/:id`,
    name: RouteKycName.KYC_ONBOARDING,
    component: PageQuestionsKYCOnboarding,
    meta: {
      title: 'Mieux vous connaître',
    },
  },
];

export default kycRoutes;
