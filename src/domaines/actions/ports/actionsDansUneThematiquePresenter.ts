import { Action } from '@/domaines/actions/ports/actions.repository';

export interface ActionsDansUneThematiquePresenter {
  presenteActions(actionsDansUneThematique: Action[]): void;

  presenteEnchainementKYCs(idEnchainementKYCs: string): void;
}
