import { RecupererServicesRechercheParUniversUsecase } from '../../../src/domaines/serviceRecherche/catalogue/recupererServicesRechercheParUnivers.usecase';
import {
  ServiceRecherchePresenterImpl,
  ServicesRechercheViewModel,
} from '../../../src/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.presenter.impl';
import { ServiceRechercheRepositoryMock } from './adapters/serviceRecherche.repository.mock';
import { RouteServiceName } from '../../../src/router/services/routes';

describe('Fichier de tests concernant la récupération des services par univers', () => {
  it("en donnant l'id d'un utilisateur et d'un univers, renvoie les services associées", async () => {
    // GIVEN
    const usecase = new RecupererServicesRechercheParUniversUsecase(
      new ServiceRechercheRepositoryMock({
        services: [
          {
            id: 'fruits_legumes',
            titre: 'Fruits et légumes de saison',
            sous_titre: 'juillet',
            externalUrl: 'externalUrlFruits',
            iconUrl: 'iconUrlFruits',
            estServiceExterne: false,
          },
          {
            id: 'proximite',
            titre: 'Mes commerces de proximité',
            sous_titre: 'À PARIS 01',
            externalUrl: 'externalUrlProximite',
            iconUrl: 'iconUrlProximite',
            estServiceExterne: false,
          },
          {
            id: 'poisson_de_saison',
            titre: 'Poissons de saison',
            sous_titre: 'Manger Bouger',
            externalUrl: 'externalUrlPoissons',
            iconUrl: 'iconUrlPoissons',
            estServiceExterne: true,
          },
        ],
      }),
    );

    // WHEN
    await usecase.execute('idUtilisateur', 'idUnivers', new ServiceRecherchePresenterImpl(expectation));

    // THEN
    function expectation(serviceRechercheViewModel: ServicesRechercheViewModel) {
      expect(serviceRechercheViewModel).toStrictEqual<ServicesRechercheViewModel>({
        services: [
          {
            estServiceExterne: false,
            label: 'Fruits et légumes de saison',
            legende: 'juillet',
            picto: 'iconUrlFruits',
            url: RouteServiceName.SERVICE_FRUITS_ET_LEGUMES,
          },
          {
            estServiceExterne: false,
            label: 'Mes commerces de proximité',
            legende: 'À PARIS 01',
            picto: 'iconUrlProximite',
            url: RouteServiceName.PROXIMITE,
          },
          {
            estServiceExterne: true,
            label: 'Poissons de saison',
            legende: 'Manger Bouger',
            picto: 'iconUrlPoissons',
            url: 'externalUrlPoissons',
          },
        ],
      });
    }
  });
});
