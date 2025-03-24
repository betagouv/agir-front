import { AuthentificationResultatPresenter } from '@/domaines/authentification/ports/authentificationResultatPresenter';
import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { Utilisateur, UtilisateurRepository } from '@/domaines/authentification/ports/utilisateur.repository';

export enum AuthentificationResultat {
  PEUT_SE_CONNECTER = 'peut_se_connecter',
  DOIT_FAIRE_ONBOARDING = 'doit_faire_onboarding',
  DOIT_VOIR_MESSAGE_RESET = 'doit_voir_message_reset',
}

interface ProchaineEtapeAuthentification {
  prochaineEtape(): AuthentificationResultat;
}

class ProchaineEtapeOnboarding implements ProchaineEtapeAuthentification {
  prochaineEtape(): AuthentificationResultat {
    return AuthentificationResultat.DOIT_FAIRE_ONBOARDING;
  }
}

class ProchaineEtapeResetMessage implements ProchaineEtapeAuthentification {
  prochaineEtape(): AuthentificationResultat {
    return AuthentificationResultat.DOIT_VOIR_MESSAGE_RESET;
  }
}

class ProchaineEtapeConnexion implements ProchaineEtapeAuthentification {
  prochaineEtape(): AuthentificationResultat {
    return AuthentificationResultat.PEUT_SE_CONNECTER;
  }
}

export class ProchaineEtapeAuthentificationStrategy {
  static determinerProchaineEtape(utilisateur: Utilisateur): ProchaineEtapeAuthentification {
    if (!utilisateur.onboardingAEteRealise) {
      return new ProchaineEtapeOnboarding();
    } else if (utilisateur.onboardingAEteRealise && utilisateur.afficherMessageReset) {
      return new ProchaineEtapeResetMessage();
    }
    return new ProchaineEtapeConnexion();
  }
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

    const prochaineEtape = ProchaineEtapeAuthentificationStrategy.determinerProchaineEtape(utilisateur);
    authentificationResultatPresenter.presente(prochaineEtape.prochaineEtape());
  }
}
