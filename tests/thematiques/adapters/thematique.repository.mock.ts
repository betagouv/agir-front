import { ThematiqueRepository } from '@/domaines/thematiques/ports/thematique.repository';
import { MissionThematique } from '@/domaines/thematiques/recupererMissionThematiqueUsecase';
import { Thematique } from '@/domaines/thematiques/ports/thematique.repository';

export class ThematiqueRepositoryMock implements ThematiqueRepository {
  constructor(private thematiquesARetourner: Thematique[]) {}

  recupererMissionThematique(_thematiqueId: string, _utilisateurId: string): Promise<MissionThematique> {
    throw new Error('Method not implemented.');
  }

  recupererThematiques(_universId: string, _utilisateurId: string): Promise<Thematique[]> {
    return Promise.resolve<Thematique[]>(this.thematiquesARetourner);
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererMissionThematiqueRecommandee(utilisateurId: string): Promise<Thematique[]> {
    throw new Error('Method not implemented.');
  }
}
