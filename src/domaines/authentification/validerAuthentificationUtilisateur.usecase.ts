import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { AuthentificationResultatPresenter } from '@/domaines/authentification/ports/authentificationResultatPresenter';
import { UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export enum AuthentificationResultat {
  PEUT_SE_CONNECTER = 'peut_se_connecter',
  DOIT_FAIRE_ONBOARDING = 'doit_faire_onboarding',
}

export class ValiderAuthentificationUtilisateurUsecase {
  constructor(
    private utilisateurRepository: UtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  public async execute(
    email: string,
    code: string,
    authentificationResultatPresenter: AuthentificationResultatPresenter,
  ) {
    const utilisateur = await this.utilisateurRepository.validerLoginOtp(email, code);
    this.sessionRepository.sauvegarderUtilisateur(utilisateur);
    authentificationResultatPresenter.presente(
      utilisateur.onboardingAEteRealise
        ? AuthentificationResultat.PEUT_SE_CONNECTER
        : AuthentificationResultat.DOIT_FAIRE_ONBOARDING,
    );
  }
}
