import { Utilisateur, UtilisateurRepository } from '@/authentification/ports/utilisateur.repository';
import { RenvoyerCoteOTPUsecase } from '@/authentification/renvoyerCoteOTPUsecase';

class SpyUtilisateurRepository implements UtilisateurRepository {
  get email(): string {
    return this._email;
  }
  private _email: string;
  authentifierUtilisateur(email: string, motDePasse: string): Promise<Utilisateur> {
    throw Error;
  }

  getUtilisateurAvecId(idUtilisateur: string): Promise<Utilisateur> {
    throw Error;
  }

  renvoyerCodeOTP(email: string): Promise<void> {
    this._email = email;
    return Promise.resolve();
  }

  validerCompteUtilisateur(email: string, code: string): Promise<Utilisateur> {
    throw Error;
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
