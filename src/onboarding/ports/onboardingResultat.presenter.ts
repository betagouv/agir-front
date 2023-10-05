import { OnboardingResultat } from '@/onboarding/evaluerOnboarding.usecase';

export interface OnboardingResultatPresenter {
  presente(resultat: OnboardingResultat);
}
