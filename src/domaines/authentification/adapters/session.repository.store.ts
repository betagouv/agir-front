import { SessionRepository } from '@/domaines/authentification/ports/session.repository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { utilisateurStore } from '@/store/utilisateur';

export class SessionRepositoryStore implements SessionRepository {
  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>) {
    const store = utilisateurStore();
    store.setUtilisateur({
      ...store.utilisateur,
      ...utilisateur,
    });
  }

  deconnecterUtilisateur() {
    utilisateurStore().reset();
  }

  getUtilisateurId() {
    return utilisateurStore().utilisateur.id;
  }

  estConnecte(): boolean {
    return !!utilisateurStore().utilisateur.id;
  }
}
