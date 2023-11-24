import { Score } from '@/score/ports/score.repository';

export interface CompteurViewModel {
  consommation: string;
  tendancePicto: string;
  texte: string;
  titre: string;
}

export interface QuizzViewModel {
  id: number;
  titre: string;
}

export interface BadgeViewModel {
  titre: string;
  date: string;
}

export interface ScoreViewModel {
  points: number;
  niveau: number;
  nombreDePointsDansLeNiveau: number;
  nombreDePointsDuNiveau: number;
}
export interface ChargementScorePresenter {
  presenteScore(score: Score): void;
}
