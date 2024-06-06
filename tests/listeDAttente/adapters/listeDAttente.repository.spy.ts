import { ListeDAttenteRepository } from '@/domaines/listeDAttente/ports/listeDAttente.repository';
import { ReponseInscription } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ReponseVerification } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';

export class ListeDAttenteSpy implements ListeDAttenteRepository {
  private _inscrireVisiteurAEteAppele: boolean = false;

  private _inscrireVisiteurArgs: { email: string; codePostal: string; typeVisiteur: string } = {
    email: '',
    codePostal: '',
    typeVisiteur: '',
  };

  private _verificationEmailWhiteListeAEteAppele: boolean = false;

  private _verificationEmailWhiteListeArgs: { email: string } = {
    email: '',
  };

  inscrireVisiteur(email: string, codePostal: string, typeVisiteur: string): Promise<ReponseInscription> {
    this._inscrireVisiteurAEteAppele = true;
    this._inscrireVisiteurArgs = {
      email,
      codePostal,
      typeVisiteur,
    };

    return Promise.resolve({ success: true });
  }

  verificationEmailWhiteListe(email: string): Promise<ReponseVerification> {
    this._verificationEmailWhiteListeAEteAppele = true;
    this._verificationEmailWhiteListeArgs = { email };

    return Promise.resolve({ estAutorise: true, aDejaUnCompte: false });
  }

  get inscrireVisiteurAEteAppele(): boolean {
    return this._inscrireVisiteurAEteAppele;
  }

  get verificationEmailWhiteListeAEteAppele(): boolean {
    return this._verificationEmailWhiteListeAEteAppele;
  }

  get inscrireVisiteurArgs(): { email: string; codePostal: string; typeVisiteur: string } | null {
    return this._inscrireVisiteurArgs;
  }

  get verificationEmailWhiteListeArgs(): { email: string } {
    return this._verificationEmailWhiteListeArgs;
  }
}
