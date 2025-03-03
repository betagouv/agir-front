import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';
import {
  CatalogueActionsPresenter,
  FiltresCatalogueActionsViewModel,
} from '@/domaines/actions/ports/catalogueActions.presenter';

export class CatalogueActionsPresenterImpl extends ActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(
    private readonly filtresCallBack: (viewModel: FiltresCatalogueActionsViewModel) => void,
    private readonly actionsCallBack: (viewModel: ActionViewModel[]) => void,
  ) {
    super(actionsCallBack);
  }

  async presenteCatalogue(catalogueActions: CatalogueActions): Promise<void> {
    await super.presente(catalogueActions.actions);
    this.filtresCallBack({
      phraseNombreActions: `${catalogueActions.actions.length} action${catalogueActions.actions.length > 1 ? 's' : ''}`,
      filtres: catalogueActions.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
        checked: filtre.selected,
      })),
    });
  }
}
