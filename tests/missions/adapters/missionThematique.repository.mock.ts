import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export class MissionThematiqueRepositoryMock implements MissionsRepository {
  constructor(private missionsARetourner: DetailMission) {}

  recupererDetailMission(_thematiqueId: string, _utilisateurId: string): Promise<DetailMission> {
    return Promise.resolve<DetailMission>(this.missionsARetourner);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }

  recupererMissionsThematique(_thematiqueId: string, _utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    return Promise.resolve();
  }

  terminerMission(_utilisateurId: string, _thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
