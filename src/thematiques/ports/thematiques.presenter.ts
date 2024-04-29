import { Thematique } from '@/thematiques/recupererThematiquesUniversUsecase';

export interface ThematiquesPresenter {
  present(thematiques: Thematique[]): void;
}
