import { ListeDAttentePresenter } from '@/domaines/listeDAttente/ports/listeDAttente.presenter';
import { ListeDAttenteRepository } from '@/domaines/listeDAttente/ports/listeDAttente.repository';

export interface ReponseInscription {
  success: boolean;
}

export class InscriptionListeDAttenteUsecase {
  constructor(private listeDAttenteRepository: ListeDAttenteRepository) {}

  async execute(
    email: string,
    codePostal: string,
    typeVisiteur: string,
    listeDAttentePresenter: ListeDAttentePresenter,
  ) {
    const reponseInscription = await this.listeDAttenteRepository.inscrireVisiteur(email, codePostal, typeVisiteur);
    listeDAttentePresenter.presente(reponseInscription);
  }
}
