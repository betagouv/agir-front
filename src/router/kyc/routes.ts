import { RouteRecordRaw } from 'vue-router';
const PageQuestionsKYCOnboarding = () => import('@/components/pages/PageQuestionsKYCOnboarding.vue');
const PageQuestionKyc = () => import('@/components/pages/PageQuestionKyc.vue');
const PageMissionQuestionsKyc = () => import('@/components/pages/PageMissionQuestionsKyc.vue');

export enum RouteKycName {
  KYC = 'kyc',
  KYC_THEMATIQUE = 'kyc-thematique',
  KYC_ONBOARDING = 'kyc-thematique-onboarding',
  KYC_COMPTE = 'kyc-compte',
}

export enum RouteKycPath {
  KYC = '/mieux-vous-connaitre/',
  KYC_ONBOARDING = '/mission/mieux-vous-connaitre/',
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
  {
    path: `/thematique/:thematiqueId/mission/:missionId${RouteKycPath.KYC}`,
    name: RouteKycName.KYC_THEMATIQUE,
    component: PageMissionQuestionsKyc,
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
