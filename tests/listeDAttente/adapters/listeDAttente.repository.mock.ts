import { InscriptionListeDAttenteRepository } from '@/domaines/listeDAttente/ports/inscriptionListeDAttente.repository';
import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';

export class ListeDAttenteMockRepository implements InscriptionListeDAttenteRepository {
  constructor(private readonly reponseARetourner: ReponseInscription) {}

  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    return Promise.resolve(this.reponseARetourner);
  }
}
