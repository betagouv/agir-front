import { Univers } from '@/univers/recupererListeUnivers.usecase';

export interface ListeUniversPresenter {
  present(univers: Univers[]): void;
}
