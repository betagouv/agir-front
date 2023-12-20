import PagePreOnboarding from '@/components/pages/PagePreOnboarding.vue';
import PageOnboarding from '@/components/pages/PageOnboarding.vue';
import PageBilanOnboarding from '@/components/pages/PageBilanOnboarding.vue';
import { RouteRecordRaw } from 'vue-router';

enum RouteOnboardingPath {
  PRE_ONBOARDING = '/pre-onboarding',
  ONBOARDING = '/onboarding',
  BILAN_ONBOARDING = 'bilan',
}

export enum RouteOnboardingName {
  PRE_ONBOARDING = 'pre-onboarding',
  ONBOARDING = 'onboarding',
  BILAN_ONBOARDING = 'bilan-onboarding',
}

const onboardingRoutes: RouteRecordRaw[] = [
  {
    path: RouteOnboardingPath.PRE_ONBOARDING,
    name: RouteOnboardingName.PRE_ONBOARDING,
    component: PagePreOnboarding,
    meta: {
      estPublique: true,
    },
  },
  {
    path: RouteOnboardingPath.ONBOARDING,
    children: [
      {
        path: RouteOnboardingPath.ONBOARDING,
        name: RouteOnboardingName.ONBOARDING,
        component: PageOnboarding,
        meta: {
          estPublique: true,
        },
      },
      {
        path: RouteOnboardingPath.BILAN_ONBOARDING,
        name: RouteOnboardingName.BILAN_ONBOARDING,
        component: PageBilanOnboarding,
        meta: {
          estPublique: true,
        },
      },
    ],
  },
];

export default onboardingRoutes;
