import { SyntheseThematiques, ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

export class ThematiquesRepositoryMock implements ThematiquesRepository {
  constructor(private readonly syntheseThematiques: SyntheseThematiques) {}

  async terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererSyntheseThematiques(utilisateurId: string): Promise<SyntheseThematiques> {
    return Promise.resolve(this.syntheseThematiques);
  }

  resetPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    throw new Error('Method not implemented.');
  }

  supprimerActionDesActionsRecommandees(
    utilisateurId: string,
    codeThematique: string,
    actionType: string,
    actionId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
