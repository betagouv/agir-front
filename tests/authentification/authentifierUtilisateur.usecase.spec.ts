import { AuthentifierUtilisateurUsecase } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import { UtilisateurRepositorySpy } from './adapters/utilisateur.repository.spy';
import { SessionRepositoryMock } from '../compte/sessionRepository.mock';

describe("Fichier de tests concernant l'authentification ", () => {
  it("Lorsque je passe un email et un mot de passe doit lancer le processus d'authentification", async () => {
    // GIVEN
    const spyUtilisateurRepository = new UtilisateurRepositorySpy();
    const usecase = new AuthentifierUtilisateurUsecase(
      spyUtilisateurRepository,
      SessionRepositoryMock.sansUtilisateurConnecte(),
    );
    // WHEN
    await usecase.execute('john.doe@example.com');
    // THEN
    expect(spyUtilisateurRepository.envoyerUnMagicLinkArgs).toStrictEqual({
      email: 'john.doe@example.com',
    });
  });
});
