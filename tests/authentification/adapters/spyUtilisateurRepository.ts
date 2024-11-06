import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';

export class SpyUtilisateurRepository implements UtilisateurRepository {
  private _authentifierUtilisateurArgs: { motDePasse: string; nomUtilisateur: string } | null = null;

  get authentifierUtilisateurArgs(): { motDePasse: string; nomUtilisateur: string } | null {
    return this._authentifierUtilisateurArgs;
  }

  constructor() {}

  authentifierUtilisateur(nomUtilisateur: string, motDePasse: string): Promise<void> {
    this._authentifierUtilisateurArgs = { nomUtilisateur, motDePasse };
    return Promise.resolve();
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

  commencerRedefinirMotDePasse(email: string): void {
    throw Error;
  }

  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    throw Error;
  }

  validerLoginOtp(email: string, code: string): Promise<Utilisateur> {
    throw Error;
  }
}
