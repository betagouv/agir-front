import { DonneesCollectivitesCP } from '@/domaines/collectivites/recupererDonneesCollectivitesCodePostal.usecase';
import { DonneesCollectivitesINSEE } from '@/domaines/collectivites/recupererDonneesCollectivitesInsee.usecase';

export interface DonneesCollectivitesRepository {
  recupererDonneesCodePostal(codePostal: string): Promise<DonneesCollectivitesCP>;
  recupererDonneesInsee(insee: string): Promise<DonneesCollectivitesINSEE>;
}
