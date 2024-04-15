import { ProfileUtilisateur } from '@/profileUtilisateur/chargerProfileUtilisateur.usecase';

export interface ProfileUtilisateurPresenter {
  present(profileUtilisateur: ProfileUtilisateur);
}
