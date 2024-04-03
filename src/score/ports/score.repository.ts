export interface Score {
  points: number;
  niveau: number;
  nombreDePointsDansLeNiveau: number;
  nombreDePointsDuNiveau: number;
  celebration: {
    id: string;
    type: 'niveau' | 'fin_mission';
    titre: string;
    new_niveau: number;
    reveal: {
      titre: string;
      description: string;
      feature: string;
    } | null;
  } | null;
}
export interface ScoreRepository {
  getScore(utilisateur: string): Promise<Score>;
}
