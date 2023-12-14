import { BilanOnboarding } from '@/bilanOnboarding/ports/bilanOnboarding.repository';

export interface BilanOnboardingPresenter {
  presente(resultat: BilanOnboarding);
}
