import { Classement } from '@/domaines/classement/recupererClassement.usecase';

export interface ClassementRepository {
  recupererClassementNational(utilisateurId: string): Promise<Classement>;
}
