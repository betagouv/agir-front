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

  async execute(compteUtilisateurACreerInput: UserInput, onboarding: OnboardingState): Promise<void> {
    const utilisateurCree = await this._compteUtilisateuRepository.creerCompteUtilisateur({
      nom: compteUtilisateurACreerInput.nom,
      email: compteUtilisateurACreerInput.mail,
      prenom: compteUtilisateurACreerInput.prenom,
      motDePasse: compteUtilisateurACreerInput.motDePasse,
      onboarding: onboarding,
    });

    this._sessionRepository.sauvegarderUtilisateur({
      nom: '',
      id: '',
      codePostal: '',
      prenom: '',
      mail: utilisateurCree.mail,
      revenuFiscal: undefined,
    });
  }
}
