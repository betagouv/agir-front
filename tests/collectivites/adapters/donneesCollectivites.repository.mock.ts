import { DonneesCollectivitesRepository } from '@/domaines/collectivites/ports/donneesCollectivites.repository';
import { DonneesCollectivitesCP } from '@/domaines/collectivites/recupererDonneesCollectivitesCodePostal.usecase';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';

export class DonneesCollectiviteRepositoryMock implements DonneesCollectivitesRepository {
  constructor(private donneesInsee: DonneesCollectivitesINSEE) {}

  recupererDonneesCodePostal(codePostal: string): Promise<DonneesCollectivitesCP> {
    throw new Error('Method not implemented.');
  }

  recupererDonneesInsee(insee: string): Promise<DonneesCollectivitesINSEE> {
    return Promise.resolve(this.donneesInsee);
  }
}
