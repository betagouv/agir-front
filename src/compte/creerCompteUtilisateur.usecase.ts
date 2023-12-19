import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { OnboardingState } from '@/onboarding/evaluerOnboarding.usecase';
import { RepositoryError } from '@/shell/repositoryError';
import { CreerComptePresenter } from '@/compte/ports/creerComptePresenter';

export interface UserInput {
  nom: string;
  mail: string;
  prenom: string;
  motDePasse: string;
}
export class CreerCompteUtilisateurUsecase {
  constructor(
    private compteUtilisateuRepository: CompteUtilisateurRepository,
    private sessionRepository: SessionRepository
  ) {}

  async execute(
    creerComptePresenter: CreerComptePresenter,
    compteUtilisateurACreerInput: UserInput,
    onboarding: OnboardingState
  ): Promise<void> {
    try {
      const utilisateurCree = await this.compteUtilisateuRepository.creerCompteUtilisateur({
        nom: compteUtilisateurACreerInput.nom,
        email: compteUtilisateurACreerInput.mail,
        prenom: compteUtilisateurACreerInput.prenom,
        motDePasse: compteUtilisateurACreerInput.motDePasse,
        onboarding: onboarding,
      });

      this.sessionRepository.sauvegarderUtilisateur({
        nom: '',
        id: '',
        codePostal: '',
        commune: '',
        prenom: '',
        mail: utilisateurCree.mail,
        revenuFiscal: null,
        nombreDePartsFiscales: 1,
        abonnementTransport: false,
        fonctionnalitesDebloquees: [],
      });
      creerComptePresenter.present();
    } catch (e) {
      if ((e as RepositoryError) && (e as RepositoryError).code === '023') {
        creerComptePresenter.presentError(e as RepositoryError);
      } else {
        throw e;
      }
    }
  }
}
