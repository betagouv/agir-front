import { Action } from '@/domaines/actions/ports/actions.repository';

export interface CatalogueActionsViewModel {
  phraseNombreActions: string;
  filtres: { id: string; label: string; checked: boolean }[];
  actions: CatalogueActionViewModel[];
}

export interface CatalogueActionViewModel {
  code: string;
  titre: string;
  nombreDePersonnes?: string;
  dejaVue: boolean;
  aidesDisponibles?: string;
  url: { name: string; params: { id: string; titre: string; type: string } };
}

export interface CatalogueActionsPresenter {
  presente(actions: Action[]): void;
}
