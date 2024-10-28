import { Thematique } from '@/domaines/thematiques/ports/thematique.repository';

export interface ThematiquesPresenter {
  present(thematiques: Thematique[]): void;
}
