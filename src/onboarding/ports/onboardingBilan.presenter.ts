import { BilanOnboardingUtilisateur } from '@/authentification/ports/utilisateur.repository';

export interface OnboardingBilanPresenter {
  presente(resultat: BilanOnboardingUtilisateur);
}
