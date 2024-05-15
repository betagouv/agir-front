import { Univers } from '@/domaines/univers/recupererListeUnivers.usecase';

export interface ListeUniversPresenter {
  present(univers: Univers[]): void;
}
