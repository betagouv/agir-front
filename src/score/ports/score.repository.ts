export interface Score {
  points: number;
  niveau: number;
  nombreDePointsDansLeNiveau: number;
  nombreDePointsDuNiveau: number;
}
export interface ScoreRepository {
  getScore(utilisateur: string): Promise<Score>;
}
