import { Thematique } from '@/thematiques/recupererThematiquesUnivers.usecase';

export interface ThematiquesPresenter {
  present(thematiques: Thematique[]): void;
}
