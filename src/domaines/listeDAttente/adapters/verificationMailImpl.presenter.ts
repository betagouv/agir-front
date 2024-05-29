import { VerificationMailPresenter } from '../ports/verificationMail.presenter';
import { ReponseVerification } from '../verificationWhiteListe.usecase';
import { RouteOnboardingName } from '@/router/onboarding/routeOnboardingName';

export interface ReponseVerificationViewModel {
  redirectUrl: string;
}

export class VerificationMailPresenterImpl implements VerificationMailPresenter {
  constructor(private readonly reponseVerificationViewModel: (viewModel: ReponseVerificationViewModel) => void) {}

  presente(reponse: ReponseVerification): void {
    const url = reponse.estAutorise
      ? RouteOnboardingName.PRE_ONBOARDING
      : RouteOnboardingName.INSCRIPTION_LISTE_D_ATTENTE;
    this.reponseVerificationViewModel({ redirectUrl: url });
  }
}
