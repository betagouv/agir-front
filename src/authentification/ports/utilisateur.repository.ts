export interface Utilisateur {
  nom: string;
  codePostal: string;
  commune: string;
  id: string;
  prenom: string;
  mail: string;
  revenuFiscal: number | null;
  nombreDePartsFiscales: number;
  abonnementTransport: boolean;
  fonctionnalitesDebloquees: string[];
}

export interface BilanOnboardingUtilisateur {
  alimentation: number;
  transports: number;
  logement: number;
  consommation: number;
}

export interface UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur>;
  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;
  validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur>;
  renvoyerCodeOTP(email: string): Promise<void>;
  commencerRedefinirMotDePasse(email: string): void;
  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void>;
  recupererBilanOnboarding(utilisateurId: string): Promise<BilanOnboardingUtilisateur>;
}
