export interface CompteUtilisateur {
  id: string;
  nom: string;
  mail: string;
  codePostal: string;
  prenom: string
}
export interface CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur>;
  mettreAjour(compteUtilisateur: CompteUtilisateur);
  creerCompteUtilisateur(nom: string, email: string, prenom: string): Promise<CompteUtilisateur>;
  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void>;
}
