export interface Utilisateur {
  nom: string;
  id: string;
}
export interface UtilisateurRepository {
  getUtilisateurAvecLeNom(nomUtilisateur: string): Promise<Utilisateur>;
  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;
}
