import { ScoreExamen } from '@/domaines/examens/terminerExamen.usecase';

export interface ExamenRepository {
  terminerExamen(idUtilisateur: string, idExamen: string): Promise<ScoreExamen>;
}
