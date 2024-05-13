import { UniversViewModel } from '@/univers/adapters/listeUnivers.presenter.impl';
import { UniversPresenter } from '@/univers/ports/univers.presenter';
import { Univers } from '@/univers/recupererListeUnivers.usecase';

export class UniversPresenterImpl implements UniversPresenter {
  constructor(private viewModel: (viewModel: UniversViewModel) => void) {}

  present(univers: Univers): void {
    this.viewModel({
      id: univers.id,
      nom: univers.nom,
      urlImage: univers.urlImage,
      nombreDeDefisRealises: univers.nombreDeDefisRealises,
    });
  }
}
