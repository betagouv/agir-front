import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

export class ThematiquesRepositorySpy implements ThematiquesRepository {
  private _terminerPersonnalisationArgs: { idUtilisateur: string; clefThematiqueApi: string } = {
    idUtilisateur: '',
    clefThematiqueApi: '',
  };

  get terminerPersonnalisationArgs(): { idUtilisateur: string; clefThematiqueApi: string } {
    return this._terminerPersonnalisationArgs;
  }

  async terminerPersonnalisation(idUtilisateur: string, clefThematiqueApi: string): Promise<void> {
    this._terminerPersonnalisationArgs = { idUtilisateur, clefThematiqueApi };
  }
}
