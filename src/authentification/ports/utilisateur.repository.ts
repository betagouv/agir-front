export interface Utilisateur {
  nom: string;
  id: string;
}
export interface UtilisateurRepository {
  getUtilisateur(nomUtilisateur: string): Promise<Utilisateur>;
}
