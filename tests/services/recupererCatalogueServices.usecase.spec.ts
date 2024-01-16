import { RecupererCatalogueServicesUseCase, ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';
import { ServiceRepository } from '@/services/ports/service.repository';
import { Service } from '@/services/recupererServiceActifs.usecase';
import {
  ServiceCataloguePresenterImpl,
  ServiceCatalogueViewModel,
} from '@/services/adapters/serviceCatalogue.presenter.impl';
import { expect } from 'vitest';

class ServiceRepositoryMock implements ServiceRepository {
  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]> {
    return Promise.resolve([
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
    ]);
  }

  parametrerService(utilisateurId: string, serviceId: string, parametres: string[]): Promise<void> {
    throw Error;
  }

  recupererServicesActifs(utilisateurId: string): Promise<Service[]> {
    throw Error;
  }

  enleverServiceActif(utilisateurId, serviceId): Promise<void> {
    throw Error;
  }

  installerServiceActif(utilisateurId, serviceId): Promise<void> {
    throw Error;
  }
}

describe('Fichier de tests concernant la recuperations des services dans le catalogue', () => {
  it('En donnant un id utilisateur doit retourner la liste des services disponibles, pour chaque élément on doit indiquer si le service est installé ou non', async () => {
    // GIVEN
    const utilisateurId = 'id';

    // WHEN
    const usecase = new RecupererCatalogueServicesUseCase(new ServiceRepositoryMock());
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
          },
        ],
        filtreThematiques: ['thematique1', 'thematique2', 'thematique3'],
      });
    }
  });
});
