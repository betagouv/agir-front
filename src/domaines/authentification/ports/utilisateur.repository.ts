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
  afficherMessageReset: boolean;
  possedeUneAdresseComplete?: boolean;
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
  validerMagicLink(email: string, code: string): Promise<Utilisateur>;

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte>;

  renvoyerCodeOTP(email: string): Promise<void>;

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur>;

  deconnecterUtilisateur(idUtilisateur: string): Promise<DeconnexionFranceConnect>;

  terminerMessageReset(idUtilisateur: string): Promise<void>;

  envoyerUnMagicLink(email: string): Promise<void>;
}
