import { Action } from '@/domaines/actions/ports/actions.repository';

export interface ActionViewModel {
  url: { name: string; params: { id: string; titre: string; type: string }; query?: Record<string, string> };
  code: string;
  titre: string;
  nombreDeParticipants?: string;
  aidesDisponibles?: string;
  label?: { text: string; color: string };
  badges?: { text: string; color: string }[];
}

export interface ActionsPresenter {
  presente(actions: Action[], query?: Record<string, string>): void;
}
