import { Action } from '@/domaines/actions/ports/actions.repository';

export interface CatalogueActionsViewModel {
  actions: CatalogueActionViewModel[];
}

export interface CatalogueActionViewModel {
  code: string;
  titre: string;
  nombreDePersonnes: string;
  aidesDisponibles?: {
    nombreDaidesDisponibles: string;
  };
  url: { name: string; params: { id: string; titre: string } };
}

export interface CatalogueActionsPresenter {
  presente(actions: Action[]): void;
}
