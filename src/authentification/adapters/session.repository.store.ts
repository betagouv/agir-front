import { SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { Utilisateur } from '@/authentification/ports/utilisateur.repository';
import { utilisateurStore } from '@/store/utilisateur';

export class SessionRepositoryStore implements SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>) {
    const store = utilisateurStore();
    store.setUtilisateur({
      ...store.utilisateur,
      ...utilisateur,
    });
  }

  nouvelleFeatureDebloquee(featureDebloquee: string): void {
    utilisateurStore().utilisateur.fonctionnalitesDebloquees.push(featureDebloquee);
  }
}
