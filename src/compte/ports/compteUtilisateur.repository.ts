import { OnboardingState } from '@/onboarding/evaluerOnboarding.usecase';

export interface CompteUtilisateur {
  id: string;
  nom: string;
  mail: string;
  codePostal: string;
  prenom: string;
  revenuFiscal: string;
}

export interface CompteUtilisateurACreer {
  nom: string;
  email: string;
  prenom: string;
  onboarding: OnboardingState;
}
export interface CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur>;
  mettreAjour(compteUtilisateur: CompteUtilisateur);
  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur>;
  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void>;
}
