export interface Utilisateur {
  nom: string;
  codePostal: string;
  commune: string;
  id: string;
  prenom: string;
  mail: string;
  revenuFiscal: number | null;
}

export interface UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur>;
  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;
  validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur>;
  renvoyerCodeOTP(email: string): Promise<void>;
  commencerRedefinirMotDePasse(email: string): void;
  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void>;
}
