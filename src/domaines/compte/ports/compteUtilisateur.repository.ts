export interface CompteUtilisateur {
  id: string;
  nom: string;
  mail: string;
  prenom: string;
  pseudo: string;
  fonctionnalitesDebloquees: string[];
}

export interface CompteTemporaire {
  mail: string;
}

export interface CompteUtilisateurACreer {
  email: string;
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
    pseudo: string,
    codeEpci: string,
    codePostal: string,
    dateNaissance?: {
      jour: number;
      mois: number;
      annee: number;
    },
  ): Promise<void>;
}
