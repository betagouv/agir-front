import { ProfileUtilisateur } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

export interface ProfileUtilisateurRepository {
  getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur>;
  mettreAjour(profileUtilisateur: ProfileUtilisateur);
}
