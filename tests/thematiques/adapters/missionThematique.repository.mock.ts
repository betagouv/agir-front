import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';

export class MissionThematiqueRepositoryMock implements ThematiqueRepository {
  constructor(private missionsARetourner: MissionThematique) {}

  recupererMissionThematique(_thematiqueId: string, _utilisateurId: string): Promise<MissionThematique> {
    return Promise.resolve<MissionThematique>(this.missionsARetourner);
  }

  recupererThematiques(_universId: string, _utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    return Promise.resolve();
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
