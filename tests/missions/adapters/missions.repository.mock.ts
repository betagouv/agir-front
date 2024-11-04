import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export class MissionsRepositoryMock implements MissionsRepository {
  constructor(private thematiquesARetourner: Mission[]) {}

  recupererDetailMission(_thematiqueId: string, _utilisateurId: string): Promise<DetailMission> {
    throw new Error('Method not implemented.');
  }

  recupererMissionsThematique(_universId: string, _utilisateurId: string): Promise<Mission[]> {
    return Promise.resolve<Mission[]>(this.thematiquesARetourner);
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Mission[]> {
    return Promise.resolve<Mission[]>(this.thematiquesARetourner);
  }
}
