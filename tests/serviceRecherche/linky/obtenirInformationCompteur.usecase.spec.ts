import { ObtenirInformationCompteurUsecase } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
import {
  ServiceRechercheLinkyPresenterImpl,
  ServiceLinkyViewModel,
} from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheLinky.presenter.impl';
import { ServiceRechercheLinkyRepositoryMock } from './adapters/serviceRechercheLinky.repository.mock';

describe('Fichier de tests concernant la récupération des informations compteur', () => {
  it("En donnant un id d'utilisateur et l'id de la question KYC doit appeler le back pour récuperer la question pour un type libre", async () => {
    // GIVEN
    const questionRepository = new ServiceRechercheLinkyRepositoryMock({
      prm: '',
      estConfigure: false,
      estActif: false,
      estFonctionnel: false,
      configurationEnErreur: false,
    });

    // WHEN
    const usecase = new ObtenirInformationCompteurUsecase(questionRepository);
    await usecase.execute('utilisateurId', new ServiceRechercheLinkyPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ServiceLinkyViewModel) {
      expect(viewModel).toStrictEqual<ServiceLinkyViewModel>({
        aside: {
          description:
            'Comprenez comment vous consommez et surtout, comment réduire votre consommation pour réaliser des économies.',
          logo: '/service-winter-logo.webp',
          nom: 'Winter énergies',
          screenshot: '/service-winter.webp',
          url: 'https://www.winter-energies.fr/',
          urlLabel: 'https://www.winter-energies.fr/',
        },
        categories: [],
        informationCompteur: {
          configurationEnErreur: false,
          estActif: false,
          estConfigure: false,
          estFonctionnel: false,
          prm: '',
        },
      });
    }
  });
});
