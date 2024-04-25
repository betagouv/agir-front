import { Univers } from '@/univers/recupererListeUnivers.usecase';

export interface UniversRepository {
  recupererLaListeDesUnivers(): Promise<Univers[]>;
}
