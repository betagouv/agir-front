import { Score, ScoreRepository } from '@/domaines/score/ports/score.repository';

export class MockScoreRepository implements ScoreRepository {
  constructor(private scoreARetourner: Score) {}

  async getScore(_utilisateur: string): Promise<Score> {
    return Promise.resolve(this.scoreARetourner);
  }
}
