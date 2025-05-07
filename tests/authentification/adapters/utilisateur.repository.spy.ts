import {
  DeconnexionFranceConnect,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class UtilisateurRepositorySpy implements UtilisateurRepository {
  private _utilisateurAEteDeco: boolean = false;

  constructor() {}

  private _envoyerUnMagicLinkArgs: { email: string } = { email: '' };

  get envoyerUnMagicLinkArgs(): { email: string } {
    return this._envoyerUnMagicLinkArgs;
  }

  private _authentifierUtilisateurArgs: { motDePasse: string; nomUtilisateur: string } | null = null;

  get authentifierUtilisateurArgs(): { motDePasse: string; nomUtilisateur: string } | null {
    return this._authentifierUtilisateurArgs;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    throw Error;
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }

  validerMagicLink(email: string, code: string): Promise<Utilisateur> {
    throw Error;
  }

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur> {
    throw Error;
  }

  deconnecterUtilisateur(idUtilisateur: string): Promise<DeconnexionFranceConnect> {
    this._utilisateurAEteDeco = true;
    return Promise.resolve({
      doitSeDeconnecterDeFranceConnect: false,
      urlDeDeconnexion: '',
    });
  }

  terminerMessageReset(idUtilisateur: string): Promise<void> {
    throw Error;
  }

  envoyerUnMagicLink(email: string): Promise<void> {
    this._envoyerUnMagicLinkArgs = { email };
    return Promise.resolve(undefined);
  }
}
