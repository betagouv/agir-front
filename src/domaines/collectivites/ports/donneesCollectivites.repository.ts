import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';

export interface DonneesCollectivitesRepository {
  recupererDonneesInsee(insee: string): Promise<DonneesCollectivitesINSEE>;
}
