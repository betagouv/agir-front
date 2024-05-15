export interface Utilisateur {
  nom: string;
  id: string;
  prenom: string;
  mail: string;
  fonctionnalitesDebloquees: string[];
}

export type IdUtilisateur = string;

export interface UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur>;
  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;
  validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur>;
  renvoyerCodeOTP(email: string): Promise<void>;
  commencerRedefinirMotDePasse(email: string): void;
  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void>;
}
