import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { CatalogueActions } from '@/domaines/actions/ports/actions.repository';
import {
  CatalogueActionsPresenter,
  FiltresCatalogueActionsViewModel,
} from '@/domaines/actions/ports/catalogueActions.presenter';
import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';

export class CatalogueActionsPresenterImpl extends ActionsPresenterImpl implements CatalogueActionsPresenter {
  constructor(
    private readonly filtresCallBack: (viewModel: FiltresCatalogueActionsViewModel) => void,
    private readonly actionsCallBack: (viewModel: ActionViewModel[]) => void,
  ) {
    super(actionsCallBack);
  }

  async presenteCatalogue(catalogueActions: CatalogueActions): Promise<void> {
    const actionsTrieParRecommande = catalogueActions.actions.getActionsTrieParRecommande();
    await super.presente(actionsTrieParRecommande);
    this.filtresCallBack({
      phraseNombreActions: `${actionsTrieParRecommande.length} action${actionsTrieParRecommande.length > 1 ? 's' : ''}`,
      filtres: catalogueActions.filtres.map(filtre => {
        const label = MenuThematiques.getThematiqueData(filtre.code).labelDansLeMenu ?? filtre.label;
        const emoji = MenuThematiques.getThematiqueData(filtre.code).emoji ?? '';
        const emojiHtml = emoji ? `<span class="fr-pr-1v" aria-hidden="true">${emoji}</span> ` : '';
        const labelHtml = `${emojiHtml}${label}`;

        return {
          id: filtre.code,
          label: labelHtml,
          checked: filtre.selected,
        };
      }),
    });
  }
}
