import {
  ProfileUtilisateur,
  ProfileUtilisateurAMettreAJour,
  ProfileUtilisateurFranceConnectAMettreAJour,
} from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

export interface ProfileUtilisateurRepository {
  getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur>;

  mettreAjour(profileUtilisateur: ProfileUtilisateurAMettreAJour): Promise<void>;

  mettreAjourUtilisateurFranceConnecte(profileUtilisateur: ProfileUtilisateurFranceConnectAMettreAJour): Promise<void>;
}
