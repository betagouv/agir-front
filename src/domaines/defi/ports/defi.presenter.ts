import { Defi } from '@/domaines/defi/recupererDefisEnCoursOuAFaire.usecase';

export interface DefiPresenter {
  presente(question: Defi): void;
}
