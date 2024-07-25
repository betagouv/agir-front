import { Classement } from '@/domaines/classement/recupererClassementNational.usecase';

export interface ClassementRepository {
  recupererClassementNational(utilisateurId: string): Promise<Classement>;
}
