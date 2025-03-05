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
  email: string;
  motDePasse: string;
  situationId: string | null;
}

export type SuppressionFranceConnect = {
  doitSeDeconnecterDeFranceConnect: boolean;
  urlDeDeconnexion: string;
};

export interface CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur>;

  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire>;

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<SuppressionFranceConnect>;

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void>;

  validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void>;
}
