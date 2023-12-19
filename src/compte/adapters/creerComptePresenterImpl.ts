import { RepositoryError } from '@/shell/repositoryError';
import { CreerComptePresenter } from '@/compte/ports/creerComptePresenter';

interface CreerCompteViewModel {
  route: string;
}
export class CreerComptePresenterImpl implements CreerComptePresenter {
  constructor(private creerCompteViewModel: (viewModel: CreerCompteViewModel) => void) {}
  presentError(error: RepositoryError) {
    if (error?.code === '023') {
      this.creerCompteViewModel({
        route: 'beta-fermee',
      });
    }
  }

  present() {
    this.creerCompteViewModel({
      route: 'validation-compte',
    });
  }
}
