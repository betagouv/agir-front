import { BilanOnboarding } from '@/domaines/bilanOnboarding/ports/bilanOnboarding.repository';

export interface BilanOnboardingPresenter {
  presente(resultat: BilanOnboarding);
}
