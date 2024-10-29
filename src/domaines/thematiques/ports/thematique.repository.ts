import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export interface ThematiqueRepository {
  recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]>;
  recupererMissionsThematiquesRecommandees(utilisateurId: string): Promise<Thematique[]>;
  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique>;
  recupererPoints(idUtilisateur: string, elementId: string): Promise<void>;
  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void>;
}
