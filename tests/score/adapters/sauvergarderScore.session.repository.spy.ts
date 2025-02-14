import { Score } from '@/domaines/score/ports/score.repository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SessionRepository } from '@/domaines/authentification/ports/session.repository';

export class SauvergarderScoreSessionRepositorySpy implements SessionRepository {
  private _score: Score | null = null;

  get score(): Score | null {
    return this._score;
  }

  sauvegarderScore(score: Score): void {
    this._score = score;
  }

  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void {}

  deconnecterUtilisateur() {}
}
