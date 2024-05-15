import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

export interface ThematiquesPresenter {
  present(thematiques: Thematique[]): void;
}
