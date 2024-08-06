import { ClassementRepository } from '@/domaines/classement/ports/classement.repository';
import { ClassementGlobal } from '@/domaines/classement/recupererClassement.usecase';

export class ClassementRepositoryMock implements ClassementRepository {
  constructor(private classementARetourner: ClassementGlobal) {}

  recupererClassementNational(_utilisateurId: string): Promise<ClassementGlobal> {
    return Promise.resolve(this.classementARetourner);
  }
}
