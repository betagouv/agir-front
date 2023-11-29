import { OnboardingState } from '@/onboarding/evaluerOnboarding.usecase';

export interface CompteUtilisateur {
  id: string;
  nom: string;
  mail: string;
  codePostal: string;
  commune: string;
  prenom: string;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number | null;
}

export interface CompteTemporaire {
  mail: string;
}

export interface CompteUtilisateurACreer {
  nom: string;
  email: string;
  prenom: string;
  motDePasse: string;
  onboarding: OnboardingState;
}
export interface CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur>;
  mettreAjour(compteUtilisateur: CompteUtilisateur);
  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire>;
  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void>;
  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void>;
}
