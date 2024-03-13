import { Defi } from '@/defi/recupererListeDefis.usecase';

export interface DefiPresenter {
  presente(question: Defi): void;
}
