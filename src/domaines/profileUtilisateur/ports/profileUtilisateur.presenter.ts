import { ProfileUtilisateur } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';

export interface ProfileUtilisateurPresenter {
  present(profileUtilisateur: ProfileUtilisateur);
}
