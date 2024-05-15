import { OnboardingResultat } from '@/domaines/onboarding/evaluerOnboarding.usecase';

export interface OnboardingResultatPresenter {
  presente(resultat: OnboardingResultat);
}
