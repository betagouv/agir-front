import { ListeDAttenteSpy } from './adapters/listeDAttente.repository.spy';
import { VerificationWhitelisteMockRepository } from './adapters/verificationWhiteListe.repository.mock';
import { VerificationWhiteListeUsecase } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';
import {
  ReponseVerificationViewModel,
  VerificationMailPresenterImpl,
} from '@/domaines/listeDAttente/adapters/verificationMailImpl.presenter';
import { RouteCommuneName } from '@/router';

describe('Fichier de tests concernant le test du mail whitelisté', () => {
  it('doit envoyer les informations au back-end', async () => {
    // GIVEN
    const spyListeDAttenteRepository = new ListeDAttenteSpy();

    // WHEN
    const usecase = new VerificationWhiteListeUsecase(spyListeDAttenteRepository);
    await usecase.execute('test@test.com', new VerificationMailPresenterImpl(() => {}));

    // THEN
    expect(spyListeDAttenteRepository.verificationEmailWhiteListeAEteAppele).toBeTruthy();
    expect(spyListeDAttenteRepository.verificationEmailWhiteListeArgs).toStrictEqual({ email: 'test@test.com' });
  });

  describe('quand le visiteur est whitelisté', () => {
    it('renvoie un objet de succès', async () => {
      // GIVEN
      const usecase = new VerificationWhiteListeUsecase(
        new VerificationWhitelisteMockRepository({ estAutorise: true, aDejaUnCompte: false }),
      );

      // WHEN
      await usecase.execute('test@test.com', new VerificationMailPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: ReponseVerificationViewModel) {
        expect(viewModel).toStrictEqual<ReponseVerificationViewModel>({
          redirectUrl: 'creation-compte',
        });
      }
    });
  });

  describe("quand le visiteur n'est pas whitelisté", () => {
    it("renvoie un objet d'erreur", async () => {
      // GIVEN
      const usecase = new VerificationWhiteListeUsecase(
        new VerificationWhitelisteMockRepository({ estAutorise: false, aDejaUnCompte: false }),
      );
      // WHEN
      await usecase.execute('test@test.com', new VerificationMailPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: ReponseVerificationViewModel) {
        expect(viewModel).toStrictEqual<ReponseVerificationViewModel>({
          redirectUrl: 'inscription-liste-d-attente',
        });
      }
    });
  });

  describe('quand le visiteur possède déjà un compte', () => {
    it("renvoie sur la page d'authentification", async () => {
      // GIVEN
      const usecase = new VerificationWhiteListeUsecase(
        new VerificationWhitelisteMockRepository({ estAutorise: true, aDejaUnCompte: true }),
      );
      // WHEN
      await usecase.execute('test@test.com', new VerificationMailPresenterImpl(expectation));

      // THEN
      function expectation(viewModel: ReponseVerificationViewModel) {
        expect(viewModel).toStrictEqual<ReponseVerificationViewModel>({
          redirectUrl: RouteCommuneName.AUTHENTIFICATION,
        });
      }
    });
  });
});
