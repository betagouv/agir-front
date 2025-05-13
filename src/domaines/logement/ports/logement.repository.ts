import { Adresse } from '@/domaines/logement/recupererAdresse.usecase';
import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export interface LogementRepository {
  recupererInformation(utilisateurId: string): Promise<Logement>;
  recupererAdresse(utilisateurId: string): Promise<Adresse>;
  patcherLesInformations(utilisateurId: string, logement: Partial<Logement>): Promise<void>;
}
