import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { Mission } from '@/domaines/missions/recupererDetailMission.usecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export class TerminerMissionThematiqueRepositorySpy implements MissionsRepository {
  get terminerMissionAEteAppele(): boolean {
    return this._terminerMissionAEteAppele;
  }
  private _terminerMissionAEteAppele: boolean = false;

  recupererMissions(universId: string, utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererDetailMission(thematiqueId: string, utilisateurId: string): Promise<Mission> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    this._terminerMissionAEteAppele = true;
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }
}
