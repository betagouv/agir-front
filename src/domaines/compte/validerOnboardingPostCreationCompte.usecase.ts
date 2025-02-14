import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { OnboardingPostCreationCompteState } from '@/store/onboardingPostCreationCompte';

export class ValiderOnboardingPostCreationCompteUsecase {
  constructor(
    private compteUtilisateurRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}
  async execute(
    idUtilisateur: string,
    onboardingPostCreationCompteState: OnboardingPostCreationCompteState,
  ): Promise<void> {
    await this.compteUtilisateurRepository.validationOnboardingPostCreationCompte(
      idUtilisateur,
      onboardingPostCreationCompteState.prenom,
      onboardingPostCreationCompteState.commune,
      onboardingPostCreationCompteState.codePostal,
    );
    this.sessionRepository.sauvegarderUtilisateur({
      prenom: onboardingPostCreationCompteState.prenom,
      onboardingAEteRealise: true,
    });
  }
}
