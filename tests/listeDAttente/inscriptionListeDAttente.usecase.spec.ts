import { InscriptionListeDAttenteUsecase } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
import { ListeDAttenteSpy } from './adapters/listeDAttente.repository.spy';
import { ListeDAttenteMockRepository } from './adapters/listeDAttente.repository.mock';
import {
  ListeDAttentePresenterImpl,
  ReponseInscriptionViewModel,
} from '@/domaines/listeDAttente/adapters/listeDAttenteImpl.presenter';

describe("Fichier de tests concernant l'inscription en liste d'attente", () => {
  it('doit envoyer les informations au back-end', async () => {
    // GIVEN
    const spyListeDAttenteRepository = new ListeDAttenteSpy();

    // WHEN
    const usecase = new InscriptionListeDAttenteUsecase(spyListeDAttenteRepository);
    await usecase.execute('test@test.com', '75001', '1', new ListeDAttentePresenterImpl(() => {}));

    // THEN
    expect(spyListeDAttenteRepository.inscrireVisiteurAEteAppele).toBeTruthy();
    expect(spyListeDAttenteRepository.inscrireVisiteurArgs).toStrictEqual({
      email: 'test@test.com',
      codePostal: '75001',
      typeVisiteur: '1',
    });
  });

  describe("quand l'enregistrement fonctionne", () => {
    it('renvoie un message de succès', async () => {
      // GIVEN
      const usecase = new InscriptionListeDAttenteUsecase(new ListeDAttenteMockRepository({ succes: true }));

      // WHEN
      await usecase.execute('test@test.com', '75001', '1', new ListeDAttentePresenterImpl(expectation));

      // THEN
      function expectation(viewModel: ReponseInscriptionViewModel) {
        expect(viewModel).toStrictEqual({
          type: 'success',
          titre: 'Inscription confirmée',
          message: 'Merci, et à très bientôt sur Agir !',
        });
      }
    });
  });

  describe("quand l'enregistrement ne fonctionne pas", () => {
    it("renvoie un message d'erreur", async () => {
      // GIVEN
      const usecase = new InscriptionListeDAttenteUsecase(new ListeDAttenteMockRepository({ succes: false }));

      // WHEN
      await usecase.execute('test@test.com', '75001', '1', new ListeDAttentePresenterImpl(expectation));

      // THEN
      function expectation(viewModel: ReponseInscriptionViewModel) {
        expect(viewModel).toStrictEqual({
          type: 'error',
          titre: 'Nous sommes victime de notre succès',
          message: 'Revenez plus tard',
        });
      }
    });
  });
});
