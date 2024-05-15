import { Univers } from '@/domaines/univers/recupererListeUnivers.usecase';

export interface UniversPresenter {
  present(univers: Univers): void;
}
