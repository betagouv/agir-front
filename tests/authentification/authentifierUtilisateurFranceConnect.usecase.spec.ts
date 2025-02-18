import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { AuthentifierUtilisateurFranceConnectUsecase } from '@/domaines/authentification/authentifierUtilisateurFranceConnect.usecase';
import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
import { UtilisateurRepositoryForTest } from './adapters/utilisateurRepositoryForTest';
import { RouteComptePath } from '@/router/compte/routes';
import { RouteCoachPath } from '@/router/coach/routes';
import { PostOnboardingRepositorySpy } from './adapters/postOnboarding.repository.spy';
import { UtilisateurRepositoryMock } from './adapters/utilisateur.repository.mock';

describe("Fichier de tests concernant l'authentification France Connect", () => {
  it("En donnant un state et un code doit valider l'authentification puis le sauvegarder en session", async () => {
    // GIVEN
    // WHEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const spyPostOnboardingRepositorySpy = new PostOnboardingRepositorySpy();
    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      UtilisateurRepositoryMock.nouvelleInstance(),
      spySessionRepository,
      spyPostOnboardingRepositorySpy,
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

  it("Lorsque le service me dit que l'onboarding n'est pas fait, je dois repasser par l'onboarding et sauvegarder le prenom dans le repos d'onboarding", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise({
      prenom: 'John',
    });
    const spyPostOnboardingRepositorySpy = new PostOnboardingRepositorySpy();

    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      UtilisateurRepositoryForTest.sansOnBoardingRealise(),
      spySessionRepository,
      spyPostOnboardingRepositorySpy,
    );
    // WHEN
    await usecase.execute('code', 'state', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteComptePath.POST_CREATION_COMPTE_ETAPE_1);
    }

    expect(spyPostOnboardingRepositorySpy.utiliserArgs.prenom).toStrictEqual('John');
  });

  it("Lorsque le service me dit que l'onboarding est fait, doit aller à l'accueil et ne dois rien sauvegarder dans le post onboarding repos", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    const spyPostOnboardingRepositorySpy = new PostOnboardingRepositorySpy();

    const usecase = new AuthentifierUtilisateurFranceConnectUsecase(
      UtilisateurRepositoryForTest.avecOnBoardingRealise(),
      spySessionRepository,
      spyPostOnboardingRepositorySpy,
    );
    // WHEN
    await usecase.execute('code', 'state', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteCoachPath.COACH);
    }

    expect(spyPostOnboardingRepositorySpy.utiliserArgs).toStrictEqual({});
  });
});
