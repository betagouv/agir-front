import { Score } from "@/score/ports/scoreRepository";

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
  utilisateur: string;
  badges: BadgeViewModel[];
  score: number;
}
export interface ChargementScorePresenter {
  presenteDashboard(utilisateur: string, dashboard: Score): void;
}
