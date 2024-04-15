import { ProfileUtilisateur } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';

export interface ProfileUtilisateurRepository {
  getProfileUtilisateur(idUtilisateur: string): Promise<ProfileUtilisateur>;
  mettreAjour(profileUtilisateur: ProfileUtilisateur);
}
