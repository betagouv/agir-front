import { CreerComptePresenter } from '@/domaines/compte/ports/creerComptePresenter';
import { RouteCompteName } from '@/router/compte/routeCompteName';

interface CreerCompteViewModel {
  route: string;
}
export class CreerComptePresenterImpl implements CreerComptePresenter {
  constructor(private creerCompteViewModel: (viewModel: CreerCompteViewModel) => void) {}

  present() {
    this.creerCompteViewModel({
      route: RouteCompteName.VALIDATION_COMPTE,
    });
  }
}
