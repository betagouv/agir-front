import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';

export interface DonneesCollectivitesRepository {
  getDonneesCollectivites(codePostal: string): Promise<DonneesCollectivites>;
}
