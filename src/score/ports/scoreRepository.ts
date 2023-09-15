interface Badge {
  titre: string;
  date: string;
}

export interface Score {
  badges: Badge[];
  score: number;
}
export interface ScoreRepository {
  getScore(utilisateur: string): Promise<Score>;
}
