import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';
import {
  CatalogueActionsPresenter,
  CatalogueActionsViewModel,
} from '@/domaines/actions/ports/catalogueActions.presenter';

export class CatalogueActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(private readonly viewModel: (viewModel: CatalogueActionsViewModel) => void) {}

  async presente(catalogueActions: CatalogueActions): Promise<void> {
    this.viewModel({
      phraseNombreActions: `${catalogueActions.actions.length} action${catalogueActions.actions.length > 1 ? 's' : ''}`,
      filtres: catalogueActions.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
        checked: filtre.selected,
      })),
    });
  }
}
