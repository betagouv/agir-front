import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';
import { CommencerRedefinirMotDePasseUsecase } from '@/domaines/authentification/commencerRedefinirMotDePasse.usecase';

class SpyUtilisateurRepository implements UtilisateurRepository {
  get email(): string {
    return this._email;
  }
  private _email: string = '';

  authentifierUtilisateur(email: string, motDePasse: string): Promise<void> {
    throw Error;
  }

  commencerRedefinirMotDePasse(email: string): void {
    this._email = email;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
    throw Error;
  }

  terminerRedefinirMotDePasse(email: string, motDePasse: string, code: string): Promise<void> {
    throw Error;
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    throw Error;
  }

  validerLoginOtp(email: string, code: string): Promise<Utilisateur> {
    throw Error;
  }
}
describe('Fichier de tests concernant la réinitialisation du mot de passe', () => {
  test('Commencer la réinitialisation du mot de passe avec succès', async () => {
    // GIVEN
    const email = 'utilisateur@example.com';
    const utilisateurRepository = new SpyUtilisateurRepository();
    // WHEN
    const commencerRedefinirMotDePasseUsecase = new CommencerRedefinirMotDePasseUsecase(utilisateurRepository);
    await commencerRedefinirMotDePasseUsecase.execute(email);

    // THEN
    expect(utilisateurRepository.email).toEqual(email);
  });
});
