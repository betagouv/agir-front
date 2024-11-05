import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export class TerminerMissionThematiqueRepositorySpy implements MissionsRepository {
  get terminerMissionAEteAppele(): boolean {
    return this._terminerMissionAEteAppele;
  }
  private _terminerMissionAEteAppele: boolean = false;

  recupererMissionsThematique(_thematiqueId: string, _utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }

  recupererDetailMission(_thematiqueId: string, _utilisateurId: string): Promise<DetailMission> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(_utilisateurId: string, _thematiqueId: string): Promise<void> {
    this._terminerMissionAEteAppele = true;
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(_utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }
}
