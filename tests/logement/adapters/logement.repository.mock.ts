import { LogementRepository } from '../../../src/logement/ports/logement.repository';
import { Logement } from '../../../src/logement/recupererInformationLogement.usecase';

export class MockLogementRepository implements LogementRepository {
  constructor(private logement: Logement) {}

  recupererInformation(_utilisateurId: string): Promise<Logement> {
    return Promise.resolve(this.logement);
  }
}
