import { ServiceRecherchePresDeChezNousRepositoryMock } from './adapters/serviceRecherchePresDeChezNous.repository.mock';
import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/recupererServicePresDeChezNous.usecase';
import {
  ServiceRecherchePresDeChezNousPresenterImpl,
  ServiceRecherchePresDeChezNousViewModel,
} from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNous.presenter.impl';
import { RouteServiceName } from '@/router/services/routes';
import { RecupererDetailServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/recupererDetailServicePresDeChezNous.usecase';
import {
  DetailServiceViewModel,
  ServiceRecherchePresDeChezNousPresenterDetailImpl,
} from '@/domaines/serviceRecherche/adapters/serviceRecherchePresDeChezNousDetail.presenter.impl';

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
      });
    }
  });
});
