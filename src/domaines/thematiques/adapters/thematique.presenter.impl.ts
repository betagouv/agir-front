import { ThematiquePresenter } from '@/domaines/thematiques/ports/thematique.presenter';

import { Thematique } from '@/domaines/thematiques/recupererThematique.usecase';

export interface ThematiqueViewModel {
  id: string;
  nom: string;
  urlImage: string;
}

export class ThematiquePresenterImpl implements ThematiquePresenter {
  constructor(private viewModel: (viewModel: ThematiqueViewModel) => void) {}

  presente(thematique: Thematique): void {
    this.viewModel({
      id: thematique.id,
      nom: thematique.nom,
      urlImage: thematique.urlImage,
    });
  }
}
