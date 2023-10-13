export interface Utilisateur {
  nom: string;
  codePostal: string;
  id: string;
  prenom: string;
  mail: string;
  revenuFiscal: string;
}

export interface UtilisateurRepository {
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur>;
  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur>;
}
