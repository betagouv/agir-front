import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { MockUtilisateurRepository } from './adapters/mockUtilisateurRepository';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { AuthentifierUtilisateurFranceConnectUsecase } from '@/domaines/authentification/authentifierUtilisateurFranceConnect.usecase';
import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
import { UtilisateurRepositoryForTest } from './adapters/utilisateurRepositoryForTest';
import { RouteComptePath } from '@/router/compte/routes';
import { RouteCoachPath } from '@/router/coach/routes';

describe("Fichier de tests concernant l'authentification France Connect", () => {
  it("En donnant un state et un code doit valider l'authentification puis le sauvegarder en session", async () => {
    // GIVEN
    // WHEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      new MockUtilisateurRepository(),
      spySessionRepository,
    );
    await usecase.execute('code', 'state', new AuthentificationResultatPresenterImpl((viewModel: string) => {}));

    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: 'idUtilisateur',
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
      token: 'token',
    });
  });

  it("Lorsque le service me dit que l'onboarding n'est pas fait, je dois repasser par l'onboarding", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      UtilisateurRepositoryForTest.sansOnBoardingRealise(),
      spySessionRepository,
    );
    // WHEN
    await usecase.execute('code', 'state', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteComptePath.POST_CREATION_COMPTE_ETAPE_1);
    }
  });

  it("Lorsque le service me dit que l'onboarding est fait, doit aller à l'accueil", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      UtilisateurRepositoryForTest.avecOnBoardingRealise(),
      spySessionRepository,
    );
    // WHEN
    await usecase.execute('code', 'state', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteCoachPath.COACH);
    }
  });
});
