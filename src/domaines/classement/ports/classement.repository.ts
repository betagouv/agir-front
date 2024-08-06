import { ClassementGlobal } from '@/domaines/classement/recupererClassement.usecase';

export interface ClassementRepository {
  recupererClassementNational(utilisateurId: string): Promise<ClassementGlobal>;
}
