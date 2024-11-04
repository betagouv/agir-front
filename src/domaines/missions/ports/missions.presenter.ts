import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export interface MissionsPresenter {
  presente(missions: Mission[]): void;
}
