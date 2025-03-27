import { Gamification } from '@/domaines/score/ports/score.repository';

export interface GamificationPresenter {
  presente(gamification: Gamification): void;
}
