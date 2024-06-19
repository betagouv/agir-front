import { VerificationMailPresenter } from '@/domaines/listeDAttente/ports/verificationMail.presenter';
import { ReponseVerification } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';
import { RouteCommuneName } from '@/router';
import { RouteCompteName } from '@/router/compte/routeCompteName';
import { RouteOnboardingName } from '@/router/onboarding/routeOnboardingName';

export interface ReponseVerificationViewModel {
  redirectUrl: string;
}

export class VerificationMailPresenterImpl implements VerificationMailPresenter {
  constructor(private readonly reponseVerificationViewModel: (viewModel: ReponseVerificationViewModel) => void) {}

  presente(reponse: ReponseVerification): void {
    if (reponse.aDejaUnCompte) {
      this.reponseVerificationViewModel({ redirectUrl: RouteCommuneName.AUTHENTIFICATION });
    } else {
      const url = reponse.estAutorise
        ? RouteCompteName.CREATION_COMPTE
        : RouteOnboardingName.INSCRIPTION_LISTE_D_ATTENTE;
      this.reponseVerificationViewModel({ redirectUrl: url });
    }
  }
}
