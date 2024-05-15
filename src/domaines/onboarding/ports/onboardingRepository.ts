import { OnboardingResultat, OnboardingState } from '@/domaines/onboarding/evaluerOnboarding.usecase';

export interface OnboardingRepository {
  envoyer(onboarding: OnboardingState): Promise<OnboardingResultat>;
}
