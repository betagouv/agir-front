import { Action } from '@/domaines/actions/ports/actions.repository';

export interface CatalogueActionsPresenter {
  presente(actions: Action[]): void;
}
