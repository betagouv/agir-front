import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export class ThematiqueRepositorySpy implements ThematiqueRepository {
  get recupererPointsArgs(): { elementId: string; idUtilisateur: string } {
    return this._recupererPointsArgs;
  }

  private _recupererPointsArgs: { elementId: string; idUtilisateur: string } = {
    elementId: 'elementId',
    idUtilisateur: 'idUtilisateur',
  };

  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    throw new Error('Method not implemented.');
  }

  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    this._recupererPointsArgs = { idUtilisateur, elementId };
    return Promise.resolve();
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererMissionsThematiquesRecommandees(utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }
}
