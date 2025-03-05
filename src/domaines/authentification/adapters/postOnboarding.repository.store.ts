import { PostOnboardingRepository } from '@/domaines/authentification/ports/postOnboarding.repository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';

export class PostOnboardingRepositoryStore implements PostOnboardingRepository {
  async sauvegarderOnboarding(utilisateur: Utilisateur): Promise<void> {
    onboardingPostCreationCompte().pseudo = utilisateur.prenom;
  }
}
