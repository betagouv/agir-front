import { Mission } from '@/domaines/missions/recupererDetailMission.usecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export interface MissionsRepository {
  recupererMissions(universId: string, utilisateurId: string): Promise<Thematique[]>;
  recupererMissionsRecommandees(utilisateurId: string): Promise<Thematique[]>;
  recupererDetailMission(missionId: string, utilisateurId: string): Promise<Mission>;
  recupererPoints(idUtilisateur: string, elementId: string): Promise<void>;
  terminerMission(utilisateurId: string, missionId: string): Promise<void>;
}
