import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { CreerComptePresenter } from '@/domaines/compte/ports/creerComptePresenter';

export interface UserInput {
  mail: string;
  situationId: string | null;
  referer?: string;
  refererKeyword?: string;
}

export class CreerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(creerComptePresenter: CreerComptePresenter, compteUtilisateurACreerInput: UserInput): Promise<void> {
    await this.compteUtilisateuRepository.creerCompteUtilisateur({
      email: compteUtilisateurACreerInput.mail,
      situationId: compteUtilisateurACreerInput.situationId,
      referer: compteUtilisateurACreerInput.referer,
      refererKeyword: compteUtilisateurACreerInput.refererKeyword,
    });

    this.sessionRepository.sauvegarderUtilisateur({
      mail: compteUtilisateurACreerInput.mail,
    });
    creerComptePresenter.present();
  }
}
