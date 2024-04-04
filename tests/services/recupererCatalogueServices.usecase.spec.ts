import { RecupererCatalogueServicesUseCase } from '@/services/recupererCatalogueServices.usecase';
import { MockRecupererCatalogueServiceRepository } from './adapters/service.recuperCatalogue.repository.mock';
import {
  ServiceCataloguePresenterImpl,
  ServiceCatalogueViewModel,
} from '@/services/adapters/serviceCatalogue.presenter.impl';

describe('Fichier de tests concernant la recuperations des services dans le catalogue', () => {
  it('En donnant un id utilisateur doit retourner la liste des services disponibles, pour chaque élément on doit indiquer si le service est installé ou non', async () => {
    // GIVEN
    const utilisateurId = 'id';

    // WHEN
    const usecase = new RecupererCatalogueServicesUseCase(
      new MockRecupererCatalogueServiceRepository([
        {
          id: 'id',
          icon: 'icon',
          titre: 'titre',
          description: 'description',
          sousDescription: 'sousDescription',
          estInstalle: true,
          nombreInstallation: 1,
          thematiques: ['thematique1', 'thematique3'],
          image: 'image',
          estEnConstruction: false,
          parametrageRequis: false,
        },
        {
          id: 'id2',
          icon: 'icon',
          titre: 'titre',
          description: 'description',
          sousDescription: 'sousDescription',
          estInstalle: false,
          nombreInstallation: 1,
          thematiques: ['thematique1', 'thematique2'],
          image: 'image',
          estEnConstruction: false,
          parametrageRequis: true,
        },
      ]),
    );
    await usecase.execute(utilisateurId, new ServiceCataloguePresenterImpl(expectation));

    // THEN
    function expectation(catalogueViewModel: ServiceCatalogueViewModel) {
      expect(catalogueViewModel).toStrictEqual<ServiceCatalogueViewModel>({
        catalogue: [
          {
            description: 'description',
            estInstalle: true,
            icon: 'icon',
            id: 'id',
            nombreInstallation: ' 1 ont installé ce service',
            sousDescription: 'sousDescription',
            thematiques: ['thematique1', 'thematique3'],
            titre: 'titre',
            image: 'image',
            estEnConstruction: false,
            parametrageRequis: false,
            ancre: 'id',
          },
          {
            description: 'description',
            estInstalle: false,
            icon: 'icon',
            id: 'id2',
            nombreInstallation: ' 1 ont installé ce service',
            sousDescription: 'sousDescription',
            thematiques: ['thematique1', 'thematique2'],
            titre: 'titre',
            image: 'image',
            estEnConstruction: false,
            parametrageRequis: true,
            ancre: 'id2',
          },
        ],
        filtreThematiques: [
          { id: 'thematique1', label: 'thematique1', checked: false },
          { id: 'thematique2', label: 'thematique2', checked: false },
          { id: 'thematique3', label: 'thematique3', checked: false },
        ],
      });
    }
  });
});
