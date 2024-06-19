export interface CompteUtilisateur {
  id: string;
  nom: string;
  mail: string;
  prenom: string;
  fonctionnalitesDebloquees: string[];
}

export interface CompteTemporaire {
  mail: string;
}

export interface CompteUtilisateurACreer {
  nom: string;
  email: string;
  prenom: string;
  motDePasse: string;
  anneeDeNaissance?: number;
  codePostal: string;
  commune: string;
}
export interface CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur>;
  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire>;
  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void>;
  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void>;
}
