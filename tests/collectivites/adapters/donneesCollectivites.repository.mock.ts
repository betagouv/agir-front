import { DonneesCollectivitesRepository } from '@/domaines/collectivites/ports/donneesCollectivites.repository';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';

export class DonneesCollectiviteRepositoryMock implements DonneesCollectivitesRepository {
  constructor(private donneesInsee: DonneesCollectivitesINSEE) {}

  recupererDonneesInsee(insee: string): Promise<DonneesCollectivitesINSEE> {
    return Promise.resolve(this.donneesInsee);
  }
}
