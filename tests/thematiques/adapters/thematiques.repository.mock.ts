import { SyntheseThematiques, ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class ThematiquesRepositoryMock implements ThematiquesRepository {
  constructor(private readonly syntheseThematiques: SyntheseThematiques) {}

  async terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  recupererSyntheseThematiques(utilisateurId: string): Promise<SyntheseThematiques> {
    return Promise.resolve(this.syntheseThematiques);
  }
}
