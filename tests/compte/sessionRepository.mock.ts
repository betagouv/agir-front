import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { Gamification } from '@/domaines/score/ports/score.repository';
import { SessionRepository } from '@/domaines/authentification/ports/session.repository';

export class SessionRepositoryMock implements SessionRepository {
  private constructor(private readonly utilisateur: Partial<Utilisateur>) {}

  static avecUtilisateurConnecte(): SessionRepositoryMock {
    const repository = new SessionRepositoryMock({ id: '1' });
    return repository;
  }

  static sansUtilisateurConnecte(): SessionRepositoryMock {
    return new SessionRepositoryMock({ id: '' });
  }

  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>) {}

  sauvegarderScore(score: Gamification): void {}

  deconnecterUtilisateur() {}

  estConnecte(): boolean {
    return !!this.utilisateur.id;
  }

  getUtilisateurId(): string {
    return '';
  }
}
