import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { SyntheseThematiques, ThematiquesRepository } from '@/domaines/thematiques/ports/thematiques.repository';

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

  recupererSyntheseThematiques(utilisateurId: string): Promise<SyntheseThematiques> {
    throw new Error('Method not implemented.');
  }

  private _supprimerActionDesActionsRecommandeesArgs: {
    utilisateurId: string;
    codeThematique: string;
    actionType: string;
    actionId: string;
  } = {
    utilisateurId: '',
    codeThematique: '',
    actionType: '',
    actionId: '',
  };

  async supprimerActionDesActionsRecommandees(
    utilisateurId: string,
    codeThematique: string,
    actionType: string,
    actionId: string,
  ): Promise<void> {
    this._supprimerActionDesActionsRecommandeesArgs = { utilisateurId, codeThematique, actionType, actionId };
  }
}
