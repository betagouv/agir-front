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
    const viewModel: DefiDescriptionViewModel[] = defis
      .filter(defi => defi.status === 'todo' || defi.status === 'en_cours')
      .map(defi => ({
        thematique: defi.thematique,
        titre: defi.libelle,
        points: defi.points,
        url: `${RouteDefiPath.DEFI + defi.id}`,
      }))
      .slice(0, 4);

    this.defisViewModel(viewModel);
  }
}
