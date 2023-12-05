import { AuthentifierUtilisateurUsecase, SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  authentifierUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      codePostal: '77650',
      commune: 'NOM COMMUNE',
      prenom: 'John',
      mail: '',
      revenuFiscal: null,
      nombreDePartsFiscales: null,
      abonnementTransport: false,
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

  commencerRedefinirMotDePasse(email: string): void {
    throw Error;
  }

  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    throw Error;
  }
}

class SpySessionRepository implements SessionRepository {
  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  private _utilisateur: Utilisateur = {
    id: '',
    nom: '',
    codePostal: '',
    commune: '',
    prenom: '',
    mail: '',
    revenuFiscal: null,
    nombreDePartsFiscales: null,
    abonnementTransport: false,
  };

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
      commune: 'NOM COMMUNE',
      prenom: 'John',
      mail: '',
      revenuFiscal: null,
      nombreDePartsFiscales: null,
      abonnementTransport: false,
    });
  });
});
