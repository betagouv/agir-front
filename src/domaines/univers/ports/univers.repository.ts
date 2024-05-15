import { Univers } from '@/domaines/univers/recupererListeUnivers.usecase';

export interface UniversRepository {
  recupererLaListeDesUnivers(idUtilisateur: string): Promise<Univers[]>;
  recupererUnivers(idUtilisateur: string, universId: string): Promise<Univers>;
}
