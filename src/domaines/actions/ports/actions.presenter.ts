import { Action } from '@/domaines/actions/ports/actions.repository';
import { TagStyle } from '@/domaines/thematiques/TagThematique';

export interface ActionViewModel {
  url: { name: string; params: { id: string; titre: string; type: string } };
  code: string;
  titre: string;
  nombreDeParticipants?: string;
  aidesDisponibles?: string;
  label?: { text: string; color: string };
  badges?: { text: string; color: string }[];
  thematiqueTag: { label: string; style: TagStyle };
}

export interface ActionsPresenter {
  presente(actions: Action[]): void;
}
