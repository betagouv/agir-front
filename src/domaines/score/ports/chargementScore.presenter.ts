import { Score } from '@/domaines/score/ports/score.repository';

export interface ScoreViewModel {
  points: number;
  niveau: number;
  nombreDePointsDansLeNiveau: number;
  nombreDePointsDuNiveau: number;
}

export interface ChargementScorePresenter {
  presenteScore(score: Score): void;
}
