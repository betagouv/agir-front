import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

export interface ThematiqueRepository {
  recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]>;
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique>;
  recupererPoints(idUtilisateur: string, elementId: string): Promise<void>;
}
