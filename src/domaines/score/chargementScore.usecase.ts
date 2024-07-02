import { SessionRepository } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { ScoreRepository } from '@/domaines/score/ports/score.repository';

export class ChargementScoreUsecase {
  constructor(
    private scoreRepository: ScoreRepository,
    private sessionRepostory: SessionRepository,
  ) {}
  async execute(idUtilisateur: string): Promise<void> {
    const score = await this.scoreRepository.getScore(idUtilisateur);
    this.sessionRepostory.sauvegarderScore({
      points: score.points,
      niveau: score.niveau,
      nombreDePointsDansLeNiveau: score.nombreDePointsDansLeNiveau,
      nombreDePointsDuNiveau: score.nombreDePointsDuNiveau,
    });
  }
}
