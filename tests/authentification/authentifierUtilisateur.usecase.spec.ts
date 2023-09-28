import {
  AuthentifierUtilisateurUsecase,
  SessionRepository,
} from '../../src/authentification/authentifierUtilisateur.usecase';
import { Utilisateur, UtilisateurRepository } from '../../src/authentification/ports/utilisateur.repository';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  getUtilisateurAvecLeNom(nomUtilisateur: string): Promise<Utilisateur> {
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
  it("Lorsque je passe un nom d'utilisateur doit sauvegarder le nom et l'id", async () => {
    // GIVEN
    const spySessionRepository = new SpySessionRepository();
    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryForTest(), spySessionRepository);
    // WHEN
    await usecase.execute('Dorian');
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
