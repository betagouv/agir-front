import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { Mission } from '@/domaines/missions/recupererDetailMission.usecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export class MissionThematiqueRepositoryMock implements MissionsRepository {
  constructor(private missionsARetourner: Mission) {}

  recupererDetailMission(_thematiqueId: string, _utilisateurId: string): Promise<Mission> {
    return Promise.resolve<Mission>(this.missionsARetourner);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererMissions(_universId: string, _utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    return Promise.resolve();
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
