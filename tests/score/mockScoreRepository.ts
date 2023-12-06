import { Score, ScoreRepository } from '@/score/ports/score.repository';

export class MockScoreRepository implements ScoreRepository {
  async getScore(utilisateur: string): Promise<Score> {
    const celebrationMock: Score['celebration'] =
      utilisateur === 'userAvecCelebration'
        ? { id: 'celebrationID', type: 'niveau', titre: 'celebrationTitre', new_niveau: 4 }
        : null;

    return {
      niveau: 1,
      nombreDePointsDuNiveau: 100,
      nombreDePointsDansLeNiveau: 25,
      points: 10,
      celebration: celebrationMock,
    };
  }
}
