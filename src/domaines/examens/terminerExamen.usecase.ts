import { ExamenRepository } from '@/domaines/examens/ports/examen.repository';
import { ScoreExamenPresenter } from '@/domaines/examens/ports/scoreExamen.presenter';
import { MissionEvent } from '@/domaines/missions/missionEventBus.impl';
import { EventBus } from '@/shell/eventBus';

export interface ScoreExamen {
  pourcentageDeReussite: number;
}

export class TerminerExamenUsecase {
  constructor(
    private readonly examenRepository: ExamenRepository,
    private missionEventBus: EventBus<MissionEvent>,
  ) {}

  async execute(missionId: string, utilisateurId: string, scoreExamenPresenter: ScoreExamenPresenter): Promise<void> {
    const score = await this.examenRepository.terminerExamen(utilisateurId, missionId);
    scoreExamenPresenter.presente(score);
    this.missionEventBus.publish(MissionEvent.MISSION_TERMINEE);
  }
}
