import { ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

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

  private _resetPersonnalisationArgs: { idUtilisateur: string; clefThematiqueApi: string } = {
    idUtilisateur: '',
    clefThematiqueApi: '',
  };

  get resetPersonnalisationArgs(): { idUtilisateur: string; clefThematiqueApi: string } {
    return this._resetPersonnalisationArgs;
  }

  async resetPersonnalisation(idUtilisateur: string, clefThematiqueApi: ClefThematiqueAPI): Promise<void> {
    this._resetPersonnalisationArgs = { idUtilisateur, clefThematiqueApi };
  }
}
