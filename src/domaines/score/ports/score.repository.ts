export interface Score {
  points: number;
}
export interface ScoreRepository {
  getScore(utilisateur: string): Promise<Score>;
}
