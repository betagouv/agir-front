import { Score } from '@/score/ports/score.repository';

export interface BadgeViewModel {
  titre: string;
  date: string;
}

export interface ScoreViewModel {
  points: number;
  niveau: number;
  nombreDePointsDansLeNiveau: number;
  nombreDePointsDuNiveau: number;
  celebration: {
    id: string;
    titre: string;
    new_niveau: number;
    reveal: {
      titre: string;
      description: string;
      routeName: string;
      feature: string;
    } | null;
  } | null;
  afficherMissionsTermines: boolean;
}
export interface ChargementScorePresenter {
  presenteScore(score: Score): void;
}
