import { Defi } from '@/domaines/defi/recupererListeDefis.usecase';

export interface DefiPresenter {
  presente(question: Defi): void;
}
