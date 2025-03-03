import { Action } from '@/domaines/actions/ports/actions.repository';

export interface ActionViewModel {
  code: string;
  titre: string;
  nombreDePersonnes?: string;
  dejaVue: boolean;
  aidesDisponibles?: string;
  url: { name: string; params: { id: string; titre: string; type: string } };
}

export interface ActionsPresenter {
  presente(actions: Action[]): void;
}
