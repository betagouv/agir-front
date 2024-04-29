import { ListeUniversPresenter } from '@/univers/ports/listeUnivers.presenter';
import { Univers } from '@/univers/recupererListeUnivers.usecase';

export interface UniversViewModel {
  id: string;
  nom: string;
  urlImage: string;
  nombreDeDefisRealises: number;
}
export interface ListeUniversViewModel {
  univers: UniversViewModel[];
}

export class ListeUniversPresenterImpl implements ListeUniversPresenter {
  constructor(private listeUniversViewModel: (viewModel: ListeUniversViewModel) => void) {}

  present(univers: Univers[]): void {
    this.listeUniversViewModel({
      univers: univers.map(univers => ({
        id: univers.id,
        nom: univers.nom,
        urlImage: univers.urlImage,
        nombreDeDefisRealises: univers.nombreDeDefisRealises,
      })),
    });
  }
}
