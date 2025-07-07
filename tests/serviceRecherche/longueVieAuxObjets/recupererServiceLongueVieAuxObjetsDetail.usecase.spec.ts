import { ServiceRechercheLongueVieAuxObjetsRepositoryMock } from './adapters/serviceRechercheLongueVieAuxObjets.repository.mock';
import { RecupererDetailServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererDetailServiceLongueVieAuxObjets.usecase';
import {
  DetailLVAOViewModel,
  ServiceRechercheLongueVieAuxObjetsPresenterDetailImpl,
} from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjetsDetail.presenter.impl';

describe('Fichier de tests concernant le détail du Service Près de chez nous ', () => {
  it("en donnant l'id d'un utilisateur et d'une entrée du service près de chez nous, renvoie les informations de détail", async () => {
    // GIVEN
    const usecase = new RecupererDetailServiceLongueVieAuxObjetsUsecase(
      ServiceRechercheLongueVieAuxObjetsRepositoryMock.recupererDetailMock({
        titre: 'Mon service',
        adresse: '2 Avenue de la République, Palaiseau - 91120',
        distance: 282,
        position: { latitude: 48.7123, longitude: 2.2084 },
        sources: ['source1', 'source2'],
      }),
    );

    // WHEN
    await usecase.execute(
      'idUtilisateur',
      'idService',
      new ServiceRechercheLongueVieAuxObjetsPresenterDetailImpl(expectation),
    );

    // THEN
    function expectation(serviceRechercheLongueVieAuxObjetsViewModel: DetailLVAOViewModel) {
      expect(serviceRechercheLongueVieAuxObjetsViewModel).toStrictEqual<DetailLVAOViewModel>({
        titre: 'Mon service',
        adresse: '2 Avenue de la République, Palaiseau - 91120',
        tag: {
          label: 'À 300 m',
          style: 'background--caramel text--background-caramel',
        },
        position: { latitude: 48.7123, longitude: 2.2084 },
        sources: ['source1', 'source2'],
      });
    }
  });
});
