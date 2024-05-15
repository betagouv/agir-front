import { Logement } from '@/domaines/logement/recupererInformationLogement.usecase';

export interface LogementRepository {
  recupererInformation(utilisateurId: string): Promise<Logement>;
  enregistrerLesInformations(utilisateurId: string, logement: Logement): Promise<void>;
}
