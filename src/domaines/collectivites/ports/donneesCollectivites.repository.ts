import { DonneesCollectivites } from '@/domaines/collectivites/recuperationDonneesCollectivites.usecase';

export interface DonneesCollectivitesRepository {
  recupererDonneesCodePostal(codePostal: string): Promise<DonneesCollectivites>;
}
