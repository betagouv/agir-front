import {
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';
import { TerminerRedefinirMotDePasseUsecase } from '@/domaines/authentification/terminerRedefinirMotDePasse.usecase';

class SpyUtilisateurRepository implements UtilisateurRepository {
  private _code: string = '';
  get code(): string {
    return this._code;
  }

  private _motDePasse: string = '';
  get motDePasse(): string {
    return this._motDePasse;
  }

  private _email: string = '';

  get email(): string {
    return this._email;
  }

  authentifierUtilisateur(email: string, motDePasse: string): Promise<void> {
    throw Error;
  }

  commencerRedefinirMotDePasse(email: string): void {
    throw Error;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    throw Error;
  }

  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    this._email = email;
    this._motDePasse = motDePasse;
    this._code = code;
    return Promise.resolve();
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }

  validerLoginOtp(email: string, code: string): Promise<Utilisateur> {
    throw Error;
  }

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur> {
    throw Error;
  }
  deconnecterUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error;
  }
}

describe('Fichier de tests concernant la fin de la réinitialisation du mot de passe', () => {
  test('Terminer la réinitialisation du mot de passe avec succès', async () => {
    // GIVEN
    const email = 'utilisateur@example.com';
    const code = 'code';
    const motDePasse = 'motDePasse';
    const utilisateurRepository = new SpyUtilisateurRepository();
    // WHEN
    const terminerRedefinirMotDePasseUsecase = new TerminerRedefinirMotDePasseUsecase(utilisateurRepository);
    await terminerRedefinirMotDePasseUsecase.execute(email, motDePasse, code);

    // THEN
    expect(utilisateurRepository.email).toEqual(email);
    expect(utilisateurRepository.motDePasse).toEqual(motDePasse);
    expect(utilisateurRepository.code).toEqual(code);
  });
});
