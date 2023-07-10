interface Compteur {
  titre: string;
  valeur: number;
}
interface Quizz {
  id: number;
  titre: string;
}

interface Badge {
  titre: string;
  date: string;
}

interface Empreinte {
  bilan: string;
}
export interface Score {
  badges: Badge[];
  score: number;
}
export interface ScoreRepository {
  getScore(utilisateur: string): Promise<Score>;
}
