import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { AuthentificationResultatPresenter } from '@/domaines/authentification/ports/authentificationResultatPresenter';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';
import { AuthentificationResultat } from '@/domaines/authentification/validerAuthentificationUtilisateur.usecase';

export class AuthentifierUtilisateurFranceConnectUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(
    oidcCode: string,
    oidcState: string,
    authentificationResultatPresenter: AuthentificationResultatPresenter,
  ): Promise<void> {
    const utilisateur = await this.utilisateurRepository.seConnecterAvecFranceConnect(oidcCode, oidcState);
    this.sessionRepository.sauvegarderUtilisateur(utilisateur);
    authentificationResultatPresenter.presente(
      utilisateur.onboardingAEteRealise
        ? AuthentificationResultat.PEUT_SE_CONNECTER
        : AuthentificationResultat.DOIT_FAIRE_ONBOARDING,
    );
  }
}
