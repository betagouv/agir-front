import { CompteUtilisateurRepository } from '@/compte/ports/compteUtilisateur.repository';
import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { OnboardingState } from '@/onboarding/evaluerOnboarding.usecase';

export interface UserInput {
  nom: string;
  mail: string;
  prenom: string;
  motDePasse: string;
}
export class CreerCompteUtilisateurUsecase {
  private _compteUtilisateuRepository: CompteUtilisateurRepository;
  private _sessionRepository: SessionRepository;

  constructor(compteUtilisateuRepository: CompteUtilisateurRepository, sessionRepository: SessionRepository) {
    this._compteUtilisateuRepository = compteUtilisateuRepository;
    this._sessionRepository = sessionRepository;
  }

  async execute(compteUtlisateurACreerViewModel: UserInput, onboarding: OnboardingState): Promise<void> {
    const utilisateurCree = await this._compteUtilisateuRepository.creerCompteUtilisateur({
      nom: compteUtlisateurACreerViewModel.nom,
      email: compteUtlisateurACreerViewModel.mail,
      prenom: compteUtlisateurACreerViewModel.prenom,
      onboarding: onboarding,
    });

    this._sessionRepository.sauvegarderUtilisateur({
      nom: utilisateurCree.nom,
      id: utilisateurCree.id,
      codePostal: utilisateurCree.codePostal,
      prenom: utilisateurCree.prenom,
      mail: utilisateurCree.mail,
      revenuFiscal: utilisateurCree.revenuFiscal,
    });
  }
}
