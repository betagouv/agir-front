import { Univers } from '@/univers/recupererListeUnivers.usecase';

export interface UniversPresenter {
  present(univers: Univers): void;
}
