import { OnboardingResultat, OnboardingState } from '@/onboarding/evaluerOnboarding.usecase';

export interface OnboardingRepository {
  envoyer(onboarding: OnboardingState): Promise<OnboardingResultat>;
}
