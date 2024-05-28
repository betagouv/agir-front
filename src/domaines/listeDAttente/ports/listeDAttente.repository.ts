import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';

export interface ListeDAttenteRepository {
  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription>;
}
