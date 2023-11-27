import { Score, ScoreRepository } from '@/score/ports/score.repository';

export class MockScoreRepository implements ScoreRepository {
  async getScore(utilisateur: string): Promise<Score> {
    return {
      niveau: 1,
      nombreDePointsDuNiveau: 100,
      nombreDePointsDansLeNiveau: 25,
      points: 10,
    };
  }
}
