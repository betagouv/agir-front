import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { Mission } from '@/domaines/missions/recupererDetailMission.usecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export class ThematiqueRepositorySpy implements MissionsRepository {
  get recupererPointsArgs(): { elementId: string; idUtilisateur: string } {
    return this._recupererPointsArgs;
  }

  private _recupererPointsArgs: { elementId: string; idUtilisateur: string } = {
    elementId: 'elementId',
    idUtilisateur: 'idUtilisateur',
  };

  recupererDetailMission(thematiqueId: string, utilisateurId: string): Promise<Mission> {
    throw new Error('Method not implemented.');
  }

  async recupererMissions(universId: string, utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    this._recupererPointsArgs = { idUtilisateur, elementId };
    return Promise.resolve();
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }
}
