import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export class MissionRepositorySpy implements MissionsRepository {
  get recupererPointsArgs(): { elementId: string; idUtilisateur: string } {
    return this._recupererPointsArgs;
  }

  private _recupererPointsArgs: { elementId: string; idUtilisateur: string } = {
    elementId: 'elementId',
    idUtilisateur: 'idUtilisateur',
  };

  recupererDetailMission(thematiqueId: string, utilisateurId: string): Promise<DetailMission> {
    throw new Error('Method not implemented.');
  }

  async recupererMissionsThematique(universId: string, utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    this._recupererPointsArgs = { idUtilisateur, elementId };
    return Promise.resolve();
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }
}
