import { Defi } from '@/domaines/defi/defi';
import { ListeDefisPresenter } from '@/domaines/defi/ports/listeDefis.presenter';
import { RouteDefiPath } from '@/router/defis/routes';

export interface DefiDescriptionViewModel {
  titre: string;
  points: number;
  url: string;
}

export class ListeDefisDescriptionPresenterImpl implements ListeDefisPresenter {
  constructor(private readonly defisViewModel: (viewModel: DefiDescriptionViewModel[]) => void) {}

  presente(defis: Defi[]): void {
    const viewModel: DefiDescriptionViewModel[] = defis
      .filter(defi => defi.status === 'todo' || defi.status === 'en_cours')
      .map(defi => ({
        titre: defi.libelle,
        points: defi.points,
        url: `${RouteDefiPath.DEFI + defi.id}`,
      }))
      .slice(0, 4);

    this.defisViewModel(viewModel);
  }
}
