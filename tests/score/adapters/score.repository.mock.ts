import { Gamification, ScoreRepository } from '@/domaines/score/ports/score.repository';

export class MockScoreRepository implements ScoreRepository {
  constructor(private scoreARetourner: Gamification) {}

  async getGamification(_utilisateur: string): Promise<Gamification> {
    return Promise.resolve(this.scoreARetourner);
  }
}
