import { MissionsRepository } from '@/domaines/missions/ports/missionsRepository';
import { Mission } from '@/domaines/missions/recupererDetailMission.usecase';
import { Thematique } from '@/domaines/thematiques/thematique';

export class ThematiqueRepositoryMock implements MissionsRepository {
  constructor(private thematiquesARetourner: Thematique[]) {}

  recupererDetailMission(_thematiqueId: string, _utilisateurId: string): Promise<Mission> {
    throw new Error('Method not implemented.');
  }

  recupererMissions(_universId: string, _utilisateurId: string): Promise<Thematique[]> {
    return Promise.resolve<Thematique[]>(this.thematiquesARetourner);
  }

  recupererPoints(_idUtilisateur: string, _elementId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  terminerMission(utilisateurId: string, thematiqueId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  recupererMissionsRecommandees(utilisateurId: string): Promise<Thematique[]> {
    return Promise.resolve<Thematique[]>(this.thematiquesARetourner);
  }
}
