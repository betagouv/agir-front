import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { Score } from '@/domaines/score/ports/score.repository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';

export class SauvergarderScoreSessionRepositorySpy implements SessionRepository {
  get score(): Score | null {
    return this._score;
  }
  private _score: Score | null = null;
  nouvelleFeatureDebloquee(featureDebloquee: string): void {}

  sauvegarderScore(score: Score): void {
    this._score = score;
  }

  sauvegarderUtilisateur(utilisateur: Partial<Utilisateur>): void {}
}
