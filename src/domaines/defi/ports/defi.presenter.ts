import { Defi } from '@/domaines/defi/defi';

export interface DefiPresenter {
  presente(question: Defi): void;
}
