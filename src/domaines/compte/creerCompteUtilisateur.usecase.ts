import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { CreerComptePresenter } from '@/domaines/compte/ports/creerComptePresenter';

export interface UserInput {
  mail: string;
  motDePasse: string;
  situationId: string | null;
}
export class CreerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(creerComptePresenter: CreerComptePresenter, compteUtilisateurACreerInput: UserInput): Promise<void> {
    const utilisateurCree = await this.compteUtilisateuRepository.creerCompteUtilisateur({
      email: compteUtilisateurACreerInput.mail,
      motDePasse: compteUtilisateurACreerInput.motDePasse,
      situationId: compteUtilisateurACreerInput.situationId,
    });

    this.sessionRepository.sauvegarderUtilisateur({
      mail: utilisateurCree.mail,
    });
    creerComptePresenter.present();
  }
}
