import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ReponseVerification } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';

export interface ListeDAttenteRepository {
  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription>;
  verificationEmailWhiteListe(email: string): Promise<ReponseVerification>;
}
