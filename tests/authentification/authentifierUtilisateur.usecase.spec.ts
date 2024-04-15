import { AuthentifierUtilisateurUsecase, SessionRepository } from '@/authentification/authentifierUtilisateur.usecase';
import { IdUtilisateur, Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  authentifierUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      fonctionnalitesDebloquees: [],
    });
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<IdUtilisateur> {
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

describe("Fichier de tests concernant l'authentification ", () => {
  it("Lorsque je passe un email et un mot de passe doit authentifer et sauvegarder l'utilisateur en session", async () => {
    // GIVEN
    const spySessionRepository = new SpySauvegarderUtilisateurSessionRepository();
    const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryForTest(), spySessionRepository);
    // WHEN
    await usecase.execute('Dorian', '123');
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      fonctionnalitesDebloquees: [],
    });
  });
});
