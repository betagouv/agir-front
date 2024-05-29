import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ListeDAttenteRepository } from '@/domaines/listeDAttente/ports/listeDAttente.repository';
import { ReponseVerification } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';

export class ListeDAttenteMockRepository implements ListeDAttenteRepository {
  constructor(private readonly reponseARetourner: ReponseInscription) {}
  verificationEmailWhiteListe(email: string): Promise<ReponseVerification> {
    throw new Error('Method not implemented.');
  }

  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    return Promise.resolve(this.reponseARetourner);
  }
}
