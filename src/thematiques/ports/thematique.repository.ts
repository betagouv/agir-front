import { MissionThematique } from '@/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/thematiques/recupererThematiquesUnivers.usecase';

export interface ThematiqueRepository {
  recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]>;
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique>;
}
