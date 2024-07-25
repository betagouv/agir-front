import { AuthentifierUtilisateurUsecase } from '@/domaines/authentification/authentifierUtilisateur.usecase';
import {
  IdUtilisateur,
  Utilisateur,
  UtilisateurRepository,
} from '@/domaines/authentification/ports/utilisateur.repository';
import { SpySauvegarderUtilisateurSessionRepository } from '../compte/sessionRepository.sauvegarderUtilisateur.spy';
import { AuthentificationResultatPresenterImpl } from '@/domaines/authentification/adapters/authentificationResultatPresenterImpl';
import { RouteComptePath } from '@/router/compte/routes';
import { RouteCoachPath } from '@/router/coach/routes';

class UtilisateurRepositoryForTest implements UtilisateurRepository {
  static avecOnBoardingRealise() {
    return new UtilisateurRepositoryForTest(true);
  }

  static sansOnBoardingRealise() {
    return new UtilisateurRepositoryForTest(false);
  }
  private constructor(private onboardingRealise = true) {}
  authentifierUtilisateur(nomUtilisateur: string): Promise<Utilisateur> {
    return Promise.resolve<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: this.onboardingRealise,
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
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurUsecase(
      UtilisateurRepositoryForTest.avecOnBoardingRealise(),
      spySessionRepository,
    );
    // WHEN
    await usecase.execute('Dorian', '123', new AuthentificationResultatPresenterImpl((viewModel: string) => {}));
    // THEN
    expect(spySessionRepository.utilisateur).toStrictEqual<Utilisateur>({
      id: '1',
      nom: 'Doe',
      prenom: 'John',
      mail: '',
      fonctionnalitesDebloquees: [],
      onboardingAEteRealise: true,
    });
  });
  it("Lorsque le service me dit que l'onboarding n'est pas fait, je dois repasser par l'onboarding", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.sansOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurUsecase(
      UtilisateurRepositoryForTest.sansOnBoardingRealise(),
      spySessionRepository,
    );
    // WHEN
    await usecase.execute('Dorian', '123', new AuthentificationResultatPresenterImpl(expectToto));

    // THEN
    function expectToto(viewModel: string) {
      expect(viewModel).toEqual(RouteComptePath.POST_CREATION_COMPTE_ETAPE_1);
    }
  });
  it("Lorsque le service me dit que l'onboarding est fait, doit aller à l'accueil", async () => {
    // GIVEN
    const spySessionRepository = SpySauvegarderUtilisateurSessionRepository.avecOnBoardingRealise();
    const usecase = new AuthentifierUtilisateurUsecase(
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
