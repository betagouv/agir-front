export interface Utilisateur {
  nom: string;
  id: string;
  prenom: string;
  pseudo: string;
  mail: string;
  onboardingAEteRealise: boolean;
  afficherDisclaimerAides: boolean;
  token?: string;
  estUnUtilisateurFranceConnect: boolean;
}

export interface UtilisateurConnecte {
  id: IdUtilisateur;
  token: TokenUtilisateur;
}

export type IdUtilisateur = string;
export type TokenUtilisateur = string;

export type DeconnexionFranceConnect = {
  doitSeDeconnecterDeFranceConnect: boolean;
  urlDeDeconnexion: string;
};

export interface UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<void>;

  validerLoginOtp(email: string, code: string): Promise<Utilisateur>;

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte>;

  renvoyerCodeOTP(email: string): Promise<void>;

  commencerRedefinirMotDePasse(email: string): void;

  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void>;

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur>;

  deconnecterUtilisateur(idUtilisateur: string): Promise<DeconnexionFranceConnect>;
}
