import { AuthentificationResultatPresenter } from '@/domaines/authentification/ports/authentificationResultatPresenter';
import { AuthentificationResultat } from '@/domaines/authentification/validerAuthentificationUtilisateur.usecase';
import { RouteCoachPath } from '@/router/coach/routes';
import { RouteComptePath } from '@/router/compte/routes';
import { RouteResetPath } from '@/router/reset/routes';

export class AuthentificationResultatPresenterImpl implements AuthentificationResultatPresenter {
  constructor(private readonly routeViewModel: (viewModel: string) => void) {}

  presente(cas: string): void {
    switch (cas) {
      case AuthentificationResultat.DOIT_FAIRE_ONBOARDING:
        this.routeViewModel(RouteComptePath.POST_CREATION_COMPTE_ETAPE_1);
        break;
      case AuthentificationResultat.PEUT_SE_CONNECTER:
        this.routeViewModel(RouteCoachPath.ACCUEIL_CONNECTEE);
        break;
      case AuthentificationResultat.DOIT_VOIR_MESSAGE_RESET:
        this.routeViewModel(RouteResetPath.RESET_1);
        break;
    }
  }
}
