import { Gamification } from '@/domaines/score/ports/score.repository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SessionRepository } from '@/domaines/authentification/ports/session.repository';

export class SauvergarderScoreSessionRepositorySpy implements SessionRepository {
  private _score: Gamification | null = null;

  get score(): Gamification | null {
    return this._score;
  }

  sauvegarderScore(score: Gamification): void {
    this._score = score;
  }

  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void {}

  deconnecterUtilisateur() {}

  getUtilisateurId(): string {
    return '';
  }

  estConnecte(): boolean {
    return false;
  }
}
