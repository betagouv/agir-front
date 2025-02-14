import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';

export interface PostOnboardingRepository {
  sauvegarderOnboarding(onboarding: Partial<Utilisateur>): void;
}
