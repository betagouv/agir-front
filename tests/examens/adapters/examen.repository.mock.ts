import { ExamenRepository } from '@/domaines/examens/ports/examen.repository';
import { ScoreExamen } from '@/domaines/examens/terminerExamen.usecase';

export class ExamenRepositoryMock implements ExamenRepository {
  constructor(private scoreExamenARetourner: ScoreExamen) {}

  terminerExamen(idUtilisateur: string, idExamen: string): Promise<ScoreExamen> {
    return Promise.resolve<ScoreExamen>(this.scoreExamenARetourner);
  }
}
