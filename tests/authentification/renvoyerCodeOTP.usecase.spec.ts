import {
  DeconnexionFranceConnect,
  Utilisateur,
  UtilisateurConnecte,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';
import { RenvoyerCoteOTPUsecase } from '@/domaines/authentification/renvoyerCoteOTPUsecase';

class SpyUtilisateurRepository implements UtilisateurRepository {
  private _email: string = '';

  get email(): string {
    return this._email;
  }

  authentifierUtilisateur(email: string, motDePasse: string): Promise<void> {
    throw Error;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    this._email = email;
    return Promise.resolve();
  }

  validerCompteUtilisateur(email: string, code: string): Promise<UtilisateurConnecte> {
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

  seConnecterAvecFranceConnect(oidcCode: string, oidcState: string): Promise<Utilisateur> {
    throw Error;
  }

  deconnecterUtilisateur(idUtilisateur: string): Promise<DeconnexionFranceConnect> {
    throw Error('not implemented yet');
  }

  terminerMessageReset(idUtilisateur: string): Promise<void> {
    throw Error('not implemented yet');
  }
}

describe('Fichier de tests concernant le renvoie du code OTP', () => {
  it("On doit s'assurer que la méthode de renvoie d'OTP est appelée", async () => {
    // GIVEN
    const spyUtilisateurRepository = new SpyUtilisateurRepository();
    // WHEN
    const usecase = new RenvoyerCoteOTPUsecase(spyUtilisateurRepository);
    await usecase.execute('john@exemple.com');
    // THEN
    expect(spyUtilisateurRepository.email).toEqual('john@exemple.com');
  });
});
