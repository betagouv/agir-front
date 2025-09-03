import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { CreerComptePresenter } from '@/domaines/compte/ports/creerComptePresenter';
import { RefererRepository } from '@/domaines/compte/ports/referer.repository';

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
    private refererRepository: RefererRepository,
  ) {}

  async execute(creerComptePresenter: CreerComptePresenter, compteUtilisateurACreerInput: UserInput): Promise<void> {
    const referer = this.refererRepository.recupererLeReferer();

    await this.compteUtilisateuRepository.creerCompteUtilisateur({
      email: compteUtilisateurACreerInput.mail,
      situationId: compteUtilisateurACreerInput.situationId,
      ...referer,
    });

    this.sessionRepository.sauvegarderUtilisateur({
      mail: compteUtilisateurACreerInput.mail,
    });
    creerComptePresenter.present();
    this.refererRepository.reinitialiserLeReferer();
  }
}
