import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

export interface MissionPresenter {
  presente(mission: DetailMission): void;
}
