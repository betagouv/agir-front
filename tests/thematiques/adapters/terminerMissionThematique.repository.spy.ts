import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export class TerminerMissionThematiqueRepositorySpy implements ThematiqueRepository {
  get terminerMissionAEteAppele(): boolean {
    return this._terminerMissionAEteAppele;
  }
  private _terminerMissionAEteAppele: boolean = false;

  recupererMissionThematique(thematiqueId: string, utilisateurId: string): Promise<MissionThematique> {
    throw new Error('Method not implemented.');
  }

  async recupererThematiques(universId: string, utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(idUtilisateur: string, elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    this._terminerMissionAEteAppele = true;
    return Promise.resolve(undefined);
  }

  recupererMissionsThematiquesRecommandees(utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }
}
