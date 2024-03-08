import { Logement } from '@/logement/recupererInformationLogement.usecase';

export interface LogementRepository {
  recupererInformation(utilisateurId: string): Promise<Logement>;
}
