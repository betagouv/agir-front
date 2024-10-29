import { Thematique } from '@/domaines/thematiques/thematique';

export interface ThematiquesPresenter {
  present(thematiques: Thematique[]): void;
}
