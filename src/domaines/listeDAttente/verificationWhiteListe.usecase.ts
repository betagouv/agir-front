import { ListeDAttenteRepository } from '@/domaines/listeDAttente/ports/listeDAttente.repository';
import { VerificationMailPresenter } from '@/domaines/listeDAttente/ports/verificationMail.presenter';

export interface ReponseVerification {
  estAutorise: boolean;
  aDejaUnCompte: boolean;
}

export class VerificationWhiteListeUsecase {
  constructor(private listeDAttenteRepository: ListeDAttenteRepository) {}

  async execute(email: string, verificationMailPresenter: VerificationMailPresenter) {
    const reponseVerification = await this.listeDAttenteRepository.verificationEmailWhiteListe(email);
    verificationMailPresenter.presente(reponseVerification);
  }
}
