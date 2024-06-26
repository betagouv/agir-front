import { CreerComptePresenter } from '@/domaines/compte/ports/creerComptePresenter';
import { RouteCommuneName } from '@/router';

import { RouteCompteName } from '@/router/compte/routeCompteName';
import { RepositoryError } from '@/shell/repositoryError';

interface CreerCompteViewModel {
  route: string;
}
export class CreerComptePresenterImpl implements CreerComptePresenter {
  constructor(private creerCompteViewModel: (viewModel: CreerCompteViewModel) => void) {}
  presentError(error: RepositoryError) {
    if (error?.code === '023') {
      this.creerCompteViewModel({
        route: RouteCommuneName.BETA_FERMEE,
      });
    }
  }

  present() {
    this.creerCompteViewModel({
      route: RouteCompteName.VALIDATION_COMPTE,
    });
  }
}
