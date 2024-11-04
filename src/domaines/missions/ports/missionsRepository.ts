import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export interface MissionsRepository {
  recupererMissionsThematique(thematiqueId: string, utilisateurId: string): Promise<Mission[]>;
  recupererMissionsRecommandees(utilisateurId: string): Promise<Mission[]>;
  recupererDetailMission(missionId: string, utilisateurId: string): Promise<DetailMission>;
  recupererPoints(idUtilisateur: string, elementId: string): Promise<void>;
  terminerMission(utilisateurId: string, missionId: string): Promise<void>;
}
