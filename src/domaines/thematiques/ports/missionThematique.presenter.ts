import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';

export interface MissionThematiquePresenter {
  present(missionThematique: MissionThematique): void;
}
