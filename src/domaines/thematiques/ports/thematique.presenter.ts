import { Thematique } from '@/domaines/thematiques/recupererThematique.usecase';

export interface ThematiquePresenter {
  presente(thematique: Thematique): void;
}
