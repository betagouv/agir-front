import { MissionThematique } from '@/thematiques/recupererMissionThematiqueUsecase';

export interface MissionThematiquePresenter {
  present(missionThematique: MissionThematique): void;
}
