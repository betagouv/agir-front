import { ChangerMotDePasseDepuisLeCompteUsecase } from '@/domaines/compte/changerMotDePasseDepuisLeCompte.usecase';
import { CompteUtilisateurRepositoryMock } from './adapters/compteUtilisateur.repository.mock';

describe('Fichier de tests concernant le changement du mot passe utilisateur', () => {
  it('Quand un utilisateur est connecté, il doit pouvoir changer son mot de passe', () => {
    // GIVEN
    // WHEN
    const compteUtilisateurRepositoryForTest = new CompteUtilisateurRepositoryMock();
    const useCase = new ChangerMotDePasseDepuisLeCompteUsecase(compteUtilisateurRepositoryForTest);
    useCase.execute('idUtilisateur', 'nouveauMotDePasse');
    // THEN
    expect(compteUtilisateurRepositoryForTest.mettreAJourLeMotDePasseArgs?.idUtilisateur).toEqual('idUtilisateur');
    expect(compteUtilisateurRepositoryForTest.mettreAJourLeMotDePasseArgs?.nouveauMotDePasse).toEqual(
      'nouveauMotDePasse',
    );
  });
});
