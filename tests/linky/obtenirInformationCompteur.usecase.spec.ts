import { ObtenirInformationCompteurUsecase } from '@/linky/obtenirInformationCompteur.usecase';
import { InformationCompteurViewModel } from '@/linky/ports/linky.information.presenter';
import { MockLinkyInformationRepository } from './adapters/linkyInformation.repository.mock';
import { LinkyPresenterInformationImpl } from '@/linky/adapters/linkyInformation.presenter.impl';

describe('Fichier de test du usecase du chargement informations du compteur', () => {
  describe("quand l'utilisateur n'a pas encore configuré son service", () => {
    it('doit ouvrir la modale de configuration du service', async () => {
      // GIVEN
      const obtenirInformationCompteurUsecase = new ObtenirInformationCompteurUsecase(
        new MockLinkyInformationRepository({
          prm: '',
          estConfigure: false,
          estActif: false,
          estFonctionnel: false,
          configurationEnErreur: true,
        }),
      );

      // WHEN
      await obtenirInformationCompteurUsecase.execute('idUtilisateur', new LinkyPresenterInformationImpl(expectation));

      // THEN
      function expectation(viewModel: InformationCompteurViewModel) {
        expect(viewModel.doitOuvrirLaModaleDeConfiguration).toBeTruthy();
      }
    });
  });

  describe("quand l'utilisateur a mal configuré son service", () => {
    it("doit retourner ses infomations et prévient l'ouverture de la modale", async () => {
      // GIVEN
      const obtenirInformationCompteurUsecase = new ObtenirInformationCompteurUsecase(
        new MockLinkyInformationRepository({
          prm: '123abc456def',
          estConfigure: false,
          estActif: false,
          estFonctionnel: false,
          configurationEnErreur: true,
        }),
      );

      // WHEN
      await obtenirInformationCompteurUsecase.execute('idUtilisateur', new LinkyPresenterInformationImpl(expectation));

      // THEN
      function expectation(viewModel: InformationCompteurViewModel) {
        expect(viewModel.doitOuvrirLaModaleDeConfiguration).toBeTruthy();
      }
    });
  });

  describe('quand linky retourne une configuration en erreur', () => {
    it("doit retourner les infomations de l'utilisateur et prévient l'ouverture de la modale", async () => {
      // GIVEN
      const obtenirInformationCompteurUsecase = new ObtenirInformationCompteurUsecase(
        new MockLinkyInformationRepository({
          prm: '123456',
          estConfigure: true,
          estActif: true,
          estFonctionnel: true,
          configurationEnErreur: true,
        }),
      );

      // WHEN
      await obtenirInformationCompteurUsecase.execute('idUtilisateur', new LinkyPresenterInformationImpl(expectation));

      // THEN
      function expectation(viewModel: InformationCompteurViewModel) {
        expect(viewModel.doitOuvrirLaModaleDeConfiguration).toBeTruthy();
      }
    });
  });

  describe("quand l'utilisateur a bien configuré son service", () => {
    it('doit me retourner les informations de son compteur', async () => {
      // GIVEN
      const obtenirInformationCompteurUsecase = new ObtenirInformationCompteurUsecase(
        new MockLinkyInformationRepository({
          prm: '1234567891234',
          estConfigure: true,
          estActif: true,
          estFonctionnel: true,
          configurationEnErreur: false,
        }),
      );

      // WHEN
      await obtenirInformationCompteurUsecase.execute('idUtilisateur', new LinkyPresenterInformationImpl(expectation));

      // THEN
      function expectation(viewModel: InformationCompteurViewModel) {
        expect(viewModel).toStrictEqual<InformationCompteurViewModel>({
          prm: '1234567891234',
          estConfigure: true,
          estActif: true,
          estFonctionnel: true,
          doitOuvrirLaModaleDeConfiguration: false,
        });
      }
    });
  });
});
