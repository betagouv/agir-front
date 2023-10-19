import {
  AuthentifierUtilisateurUsecase,
  SessionRepository,
} from '../../src/authentification/authentifierUtilisateur.usecase';
import { Utilisateur, UtilisateurRepository } from '../../src/authentification/ports/utilisateur.repository';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  authentifierUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      codePostal: '77650',
      prenom: 'John',
      mail: '',
      revenuFiscal: '',
    });
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur> {
    throw Error;
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }
}

class SpySessionRepository implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  private _utilisateur: Utilisateur = { id: '', nom: '', codePostal: '', prenom: '', mail: '', revenuFiscal: '' };

  sauvegarderUtilisateur(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
  }
}

describe("Fichier de tests concernant l'authentification ", () => {
  it("Lorsque je passe un email et un mot de passe doit authentifer et sauvegarder l'utilisateur en session", async () => {
    // GIVEN
    const spySessionRepository = new SpySessionRepository();
    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryForTest(), spySessionRepository);
    // WHEN
    await usecase.execute('Dorian', '123');
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual({
      id: '1',
      nom: 'Doe',
      codePostal: '77650',
      prenom: 'John',
      mail: '',
      revenuFiscal: '',
    });
  });
});
