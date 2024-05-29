import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ListeDAttenteRepository } from '@/domaines/listeDAttente/ports/listeDAttente.repository';
import { ReponseVerification } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';

export class VerificationWhitelisteMockRepository implements ListeDAttenteRepository {
  constructor(private readonly reponseWhiteListeARetourner: ReponseVerification) {}

  verificationEmailWhiteListe(email: string): Promise<ReponseVerification> {
    return Promise.resolve(this.reponseWhiteListeARetourner);
  }

  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    throw new Error('Method not implemented.');
  }
}
