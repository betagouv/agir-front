import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ListeDAttenteRepository } from '@/domaines/listeDAttente/ports/listeDAttente.repository';

export class ListeDAttenteMockRepository implements ListeDAttenteRepository {
  constructor(private readonly reponseARetourner: ReponseInscription) {}

  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    return Promise.resolve(this.reponseARetourner);
  }
}
