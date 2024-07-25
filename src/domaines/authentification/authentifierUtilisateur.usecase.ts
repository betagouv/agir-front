import { AuthentificationResultatPresenter } from '@/domaines/authentification/ports/authentificationResultatPresenter';
import { Utilisateur, UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';
import { Score } from '@/domaines/score/ports/score.repository';

export interface SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void;
  nouvelleFeatureDebloquee(featureDebloquee: string): void;
  sauvegarderScore(score: Score): void;
}

export enum AuthentificationResultat {
  PEUT_SE_CONNECTER = 'peut_se_connecter',
  DOIT_FAIRE_ONBOARDING = 'doit_faire_onboarding',
}
export class AuthentifierUtilisateurUsecase {
  private _utilisateurRepository: UtilisateurRepository;
  private _sessionRepository: SessionRepository;
  constructor(utilisateurRepository: UtilisateurRepository, sessionRepository: SessionRepository) {
    this._utilisateurRepository = utilisateurRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(
    email: string,
    password: string,
    authentificationResultatPresenter: AuthentificationResultatPresenter,
  ): Promise<void> {
    const utilisateur = await this._utilisateurRepository.authentifierUtilisateur(email, password);
    this._sessionRepository.sauvegarderUtilisateur(utilisateur);
    authentificationResultatPresenter.presente(
      utilisateur.onboardingAEteRealise
        ? AuthentificationResultat.PEUT_SE_CONNECTER
        : AuthentificationResultat.DOIT_FAIRE_ONBOARDING,
    );
  }
}
