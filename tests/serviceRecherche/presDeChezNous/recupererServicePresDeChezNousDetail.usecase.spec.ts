import { ServiceRecherchePresDeChezNousRepositoryMock } from './adapters/serviceRecherchePresDeChezNous.repository.mock';
import { RecupererDetailServicePresDeChezNousUsecase } from '../../../src/domaines/serviceRecherche/presDeChezNous/recupererDetailServicePresDeChezNous.usecase';
import {
  DetailServiceViewModel,
  ServiceRecherchePresDeChezNousPresenterDetailImpl,
} from '../../../src/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNousDetail.presenter.impl';
import { expect, describe, it } from 'vitest';

describe('Fichier de tests concernant le détail du Service Près de chez nous ', () => {
  it("en donnant l'id d'un utilisateur et d'une entrée du service près de chez nous, renvoie les informations de détail", async () => {
    // GIVEN
    const usecase = new RecupererDetailServicePresDeChezNousUsecase(
      ServiceRecherchePresDeChezNousRepositoryMock.recupererDetailMock({
        titre: 'Mon service',
        image: '',
        adresse: '2 Avenue de la République, Palaiseau - 91120',
        telephone: '01 23 45 67 89',
        heuresOuvertures: 'Du lundi au vendredi de 9h à 18h',
        siteWeb: 'https://monservice.fr',
        distance: 282,
        description: 'Description de mon service',
        position: { latitude: 48.7123, longitude: 2.2084 },
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      new ServiceRecherchePresDeChezNousPresenterDetailImpl(expectation),
    );

    // THEN
    function expectation(serviceRecherchePresDeChezNousViewModel: DetailServiceViewModel) {
      expect(serviceRecherchePresDeChezNousViewModel).toStrictEqual<DetailServiceViewModel>({
        titre: 'Mon service',
        img: '',
        adresse: '2 Avenue de la République, Palaiseau - 91120',
        telephone: '01 23 45 67 89',
        heuresOuvertures: 'Du lundi au vendredi de 9h à 18h',
        siteWeb: 'https://monservice.fr',
        description: 'Description de mon service',
        tag: {
          label: 'À 300 m',
          style: 'background--caramel text--background-caramel',
        },
        position: { latitude: 48.7123, longitude: 2.2084 },
      });
    }
  });
});
