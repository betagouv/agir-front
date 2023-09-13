export interface CompteUtilisateur {
  id: string;
  nom: string;
  mail: string;
  codePostal: string;
}
export interface CompteUtilisateurRepository {
  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur>;
  mettreAjour(compteUtilisateur: CompteUtilisateur);
  creerCompteUtilisateur(nom: string, email: string): Promise<CompteUtilisateur>;
}
