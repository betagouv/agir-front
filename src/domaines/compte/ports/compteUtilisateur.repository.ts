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
  referer?: string;
  refererKeyword?: string;
}

export type SuppressionFranceConnect = {
  doitSeDeconnecterDeFranceConnect: boolean;
  urlDeDeconnexion: string;
};

export interface CompteUtilisateurRepository {
  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteTemporaire>;

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<SuppressionFranceConnect>;

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void>;
}
