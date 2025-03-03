import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
import { Action } from '@/domaines/actions/ports/actions.repository';

export interface ActionDansUneThematiqueViewModel {
  doitRepondreAuxKYCs: boolean;
  idEnchainementKYCs: string;
  actions: ActionViewModel[];
}

export interface ActionsDansUneThematiquePresenter {
  presenteActions(actionsDansUneThematique: Action[]): void;

  presenteEnchainementKYCs(idEnchainementKYCs: string): void;
}
