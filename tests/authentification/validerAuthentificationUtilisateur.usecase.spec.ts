import { Utilisateur } from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { MockUtilisateurRepository } from './adapters/mockUtilisateurRepository';
import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
import { ValiderAuthentificationUtilisateurUsecase } from '@/domaines/authentification/validerAuthentificationUtilisateur.usecase';
import { RouteComptePath } from '@/router/compte/routes';
import { RouteCoachPath } from '@/router/coach/routes';
import { UtilisateurRepositoryForTest } from './adapters/utilisateurRepositoryForTest';

describe("Fichier de tests concernant la validation de l'authentification de l'utilisateur", () => {
  it("En donnant un mail et un code doit valider l'authentification puis le sauvegarder en session", async () => {
    // GIVEN
    // WHEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new ValiderAuthentificationUtilisateurUsecase(
      new MockUtilisateurRepository(),
      spySessionRepository,
    );
    await usecase.execute(
      'john@exemple.com',
      '123456',
      new AuthentificationResultatPresenterImpl((viewModel: string) => {}),
    );

    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: 'id',
      nom: '',
      prenom: '',
      mail: 'john@exemple.com',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: false,
      afficherDisclaimerAides: false,
    });
  });

  it("Lorsque le service me dit que l'onboarding n'est pas fait, je dois repasser par l'onboarding", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new ValiderAuthentificationUtilisateurUsecase(
      UtilisateurRepositoryForTest.sansOnBoardingRealise(),
      spySessionRepository,
    );
    // WHEN
    await usecase.execute('Dorian', '123', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteComptePath.POST_CREATION_COMPTE_DISCLAIMER);
    }
  });

  it("Lorsque le service me dit que l'onboarding est fait, doit aller à l'accueil", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    const usecase = new ValiderAuthentificationUtilisateurUsecase(
      UtilisateurRepositoryForTest.avecOnBoardingRealise(),
      spySessionRepository,
    );
    // WHEN
    await usecase.execute('Dorian', '123', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteCoachPath.COACH);
    }
  });
});
