import { ChangerMotDePasseDepuisLeCompteUsecase } from '@/domaines/compte/changerMotDePasseDepuisLeCompte.usecase';
import {
  CompteUtilisateur,
  CompteUtilisateurACreer,
  CompteUtilisateurRepository,
} from '@/domaines/compte/ports/compteUtilisateur.repository';
import { Error } from 'lighthouse/core/lib/lantern/lantern';

class CompteUtilisateurRepositoryForTest implements CompteUtilisateurRepository {
  get nouveauMotDePasse(): string {
    return this._nouveauMotDePasse;
  }
  private _nouveauMotDePasse: string = '';
  get idUtilisateur(): string {
    return this._idUtilisateur;
  }
  private _idUtilisateur: string = '';
  creerCompteUtilisateur(compteUtilisateurACreer: CompteUtilisateurACreer): Promise<CompteUtilisateur> {
    throw Error;
  }

  getCompteUtilisateur(idUtilisateur: string): Promise<CompteUtilisateur> {
    throw Error;
  }

  mettreAJourLeMotDePasse(idUtilisateur: string, nouveauMotDePasse: string): Promise<void> {
    this._idUtilisateur = idUtilisateur;
    this._nouveauMotDePasse = nouveauMotDePasse;
    return Promise.resolve();
  }

  supprimerCompteUtilisateur(idUtilisateur: string): Promise<void> {
    throw Error;
  }

  validationOnboardingPostCreationCompte(
    idUtilisateur: string,
    prenom: string,
    commune: string,
    codePostal: string,
  ): Promise<void> {
    return Promise.resolve(undefined);
  }
}
describe('Fichier de tests concernant le changement du mot passe utilisateur', () => {
  it('Quand un utilisateur est connecté, il doit pouvoir changer son mot de passe', () => {
    // GIVEN
    // WHEN
    const compteUtilisateurRepositoryForTest = new CompteUtilisateurRepositoryForTest();
    const useCase = new ChangerMotDePasseDepuisLeCompteUsecase(compteUtilisateurRepositoryForTest);
    useCase.execute('idUtilisateur', 'nouveauMotDePasse');
    // THEN
    expect(compteUtilisateurRepositoryForTest.idUtilisateur).toEqual('idUtilisateur');
    expect(compteUtilisateurRepositoryForTest.nouveauMotDePasse).toEqual('nouveauMotDePasse');
  });
});
