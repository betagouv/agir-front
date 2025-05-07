import { LogementRepository } from '@/domaines/logement/ports/logement.repository';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export class MockLogementRepository implements LogementRepository {
  constructor(private logement: Logement) {}

  recupererInformation(_utilisateurId: string): Promise<Logement> {
    return Promise.resolve(this.logement);
  }

  patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void> {
    return Promise.resolve(undefined);
  }
}
