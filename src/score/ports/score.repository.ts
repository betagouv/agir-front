export interface Score {
  points: number;
  niveau: number;
  nombreDePointsDansLeNiveau: number;
  nombreDePointsDuNiveau: number;
  celebration: {
    id: string;
    type: 'niveau';
    titre: string;
    new_niveau: number;
  } | null;
}
export interface ScoreRepository {
  getScore(utilisateur: string): Promise<Score>;
}
