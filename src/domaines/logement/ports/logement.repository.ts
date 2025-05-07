import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export interface LogementRepository {
  recupererInformation(utilisateurId: string): Promise<Logement>;
  patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void>;
}
