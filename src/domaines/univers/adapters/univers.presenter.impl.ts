import { UniversViewModel } from '@/domaines/univers/adapters/listeUnivers.presenter.impl';
import { UniversPresenter } from '@/domaines/univers/ports/univers.presenter';
import { Univers } from '@/domaines/univers/recupererListeUnivers.usecase';

export class UniversPresenterImpl implements UniversPresenter {
  constructor(private viewModel: (viewModel: UniversViewModel) => void) {}

  present(univers: Univers): void {
    this.viewModel({
      id: univers.id,
      nom: univers.nom,
      urlImage: univers.urlImage,
      nombreDeDefisRealises: univers.nombreDeDefisRealises,
      estBloque: univers.estBloque,
      estTermine: univers.estTermine,
    });
  }
}
