import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { CatalogueActions, TypeAction } from '@/domaines/actions/ports/actions.repository';
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
    const actionsFiltrees = catalogueActions.actions.filter(
      action => action.type !== TypeAction.SIMULATEUR || action.code === 'action_simulateur_voiture',
    );
    await super.presente(actionsFiltrees);
    this.filtresCallBack({
      phraseNombreActions: `${actionsFiltrees.length} action${actionsFiltrees.length > 1 ? 's' : ''}`,
      filtres: catalogueActions.filtres.map(filtre => ({
        id: filtre.code,
        label: filtre.label,
        checked: filtre.selected,
      })),
    });
  }
}
