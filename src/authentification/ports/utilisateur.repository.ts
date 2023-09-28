export interface Utilisateur {
  nom: string;
  codePostal: string;
  id: string;
  prenom: string;
  mail: string;
  revenuFiscal: string;
}

export interface UtilisateurRepository {
  getUtilisateurAvecLeNom(nomUtilisateur: string): Promise<Utilisateur>;
  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;
}
