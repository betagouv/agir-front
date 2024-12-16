import { ScoreExamen } from '@/domaines/examens/terminerExamen.usecase';

export interface ScoreExamenPresenter {
  presente(scoreExamen: ScoreExamen): void;
}
