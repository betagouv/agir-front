import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';
import { Classement } from '@/domaines/classement/recupererClassement.usecase';

export class ClassementRepositoryMock implements ClassementRepository {
  constructor(private classementARetourner: Classement) {}

  recupererClassementNational(_utilisateurId: string): Promise<Classement> {
    return Promise.resolve(this.classementARetourner);
  }
}
