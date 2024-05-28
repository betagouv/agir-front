import { ListeDAttenteRepository } from '../../../src/domaines/listeDAttente/ports/listeDAttente.repository';
import { ReponseInscription } from '../../../src/domaines/listeDAttente/inscriptionListeDAttente.usecase';

export class ListeDAttenteSpy implements ListeDAttenteRepository {
  private _inscrireVisiteurAEteAppele: boolean = false;

  private _inscrireVisiteurArgs: { email: string; codePostal: string; typeVisiteur: string };

  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    this._inscrireVisiteurAEteAppele = true;
    this._inscrireVisiteurArgs = {
      email,
      codePostal,
      typeVisiteur,
    };

    return Promise.resolve({ succes: true });
  }

  get inscrireVisiteurAEteAppele(): boolean {
    return this._inscrireVisiteurAEteAppele;
  }

  get inscrireVisiteurArgs(): { email: string; codePostal: string; typeVisiteur: string } | null {
    return this._inscrireVisiteurArgs;
  }
}
