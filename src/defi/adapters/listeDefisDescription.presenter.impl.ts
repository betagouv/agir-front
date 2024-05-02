import { ListeDefisPresenter } from '@/defi/ports/listeDefis.presenter';
import { Defi } from '@/defi/recupererListeDefis.usecase';
import { RouteDefiPath } from '@/router/defis/routes';

export interface DefiDescriptionViewModel {
  titre: string;
  thematique: string;
  points: number;
  url: string;
}

export class ListeDefisDescriptionPresenterImpl implements ListeDefisPresenter {
  constructor(private readonly defisViewModel: (viewModel: DefiDescriptionViewModel[]) => void) {}

  presente(defis: Defi[]): void {
    const viewModel = defis.map(defi => ({
      thematique: defi.thematique,
      titre: defi.libelle,
      points: defi.points,
      url: `${RouteDefiPath.DEFI + defi.id}`,
    }));

    this.defisViewModel(viewModel);
  }
}
