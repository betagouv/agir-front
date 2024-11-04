import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { DetailMission } from '@/domaines/missions/recupererDetailMission.usecase';

import { Mission } from '@/domaines/missions/recupererMissionsThematique.usecase';

export class TerminerMissionThematiqueRepositorySpy implements MissionsRepository {
  get terminerMissionAEteAppele(): boolean {
    return this._terminerMissionAEteAppele;
  }
  private _terminerMissionAEteAppele: boolean = false;

  recupererMissionsThematique(universId: string, utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }

  recupererDetailMission(thematiqueId: string, utilisateurId: string): Promise<DetailMission> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    this._terminerMissionAEteAppele = true;
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Mission[]> {
    throw new Error('Method not implemented.');
  }
}
