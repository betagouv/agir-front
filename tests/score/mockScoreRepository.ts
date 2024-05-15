import { Score, ScoreRepository } from '@/domaines/score/ports/score.repository';

export class MockScoreRepository implements ScoreRepository {
  constructor(private celebrationMock: Score['celebration'] = null) {
    celebrationMock = celebrationMock;
  }

  async getScore(_utilisateur: string): Promise<Score> {
    return {
      niveau: 1,
      nombreDePointsDuNiveau: 100,
      nombreDePointsDansLeNiveau: 25,
      points: 10,
      celebration: this.celebrationMock,
    };
  }
}
