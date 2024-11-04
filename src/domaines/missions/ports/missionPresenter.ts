import { Mission } from '@/domaines/missions/recupererDetailMission.usecase';

export interface MissionPresenter {
  presente(mission: Mission): void;
}
