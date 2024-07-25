import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { CompteUtilisateurRepository } from '@/domaines/compte/ports/compteUtilisateur.repository';
import { CreerComptePresenter } from '@/domaines/compte/ports/creerComptePresenter';
import { RepositoryError } from '@/shell/repositoryError';

export interface UserInput {
  mail: string;
  motDePasse: string;
}
export class CreerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository,
  ) {}

  async execute(creerComptePresenter: CreerComptePresenter, compteUtilisateurACreerInput: UserInput): Promise<void> {
    try {
      const utilisateurCree = await this.compteUtilisateuRepository.creerCompteUtilisateur({
        email: compteUtilisateurACreerInput.mail,
        motDePasse: compteUtilisateurACreerInput.motDePasse,
      });

      this.sessionRepository.sauvegarderUtilisateur({
        mail: utilisateurCree.mail,
      });
      creerComptePresenter.present();
    } catch (e) {
      const repositoryError = e as RepositoryError;
      if (repositoryError && repositoryError.code === '023') {
        creerComptePresenter.presentError(repositoryError);
      } else {
        throw e;
      }
    }
  }
}
