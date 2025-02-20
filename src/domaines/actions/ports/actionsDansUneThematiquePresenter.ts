import { Action } from '@/domaines/actions/ports/actions.repository';
import { CatalogueActionViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';

export interface ActionDansUneThematiqueViewModel {
  doitRepondreAuxKYCs: boolean;
  idEnchainementKYCs: string;
  actions: CatalogueActionViewModel[];
}

export interface ActionsDansUneThematiquePresenter {
  presenteActions(actionsDansUneThematique: Action[]): void;

  presenteEnchainementKYCs(idEnchainementKYCs: string): void;
}
