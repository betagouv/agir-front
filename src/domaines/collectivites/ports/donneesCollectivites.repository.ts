import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';

export interface DonneesCollectivitesRepository {
  getDonneesCodePostal(codePostal: string): Promise<DonneesCollectivites>;
}
