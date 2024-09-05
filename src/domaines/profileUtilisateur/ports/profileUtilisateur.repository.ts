import {
  ProfileUtilisateur,
  ProfileUtilisateurAMettreAJour,
} from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

export interface ProfileUtilisateurRepository {
  getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur>;
  mettreAjour(profileUtilisateur: ProfileUtilisateurAMettreAJour): Promise<void>;
}
