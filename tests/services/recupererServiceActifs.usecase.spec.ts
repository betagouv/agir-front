import { RecupererServiceActifsUsecase } from '@/services/recupererServiceActifs.usecase';
import { ServiceRepository } from '@/services/ports/service.repository';
import { ServicePresenterImpl, ServiceViewModel } from '@/services/adapters/service.presenter.impl';
import { ServiceCatalogue } from '@/services/recupererCatalogueServices.usecase';

class ServiceRepositoryMock implements ServiceRepository {
  async recupererServicesActifs(utilisateurId: string) {
    return Promise.resolve([
      {
        label: 'Votre conso élec au jour le jour',
        url: 'https://www.enedis.fr/le-compteur-linky-un-outil-pour-la-transition-ecologique',
        isUrlExterne: true,
      },
      {
        label: 'La recette du jour, de saison !',
        url: 'https://cuisine-facile.com/index.php',
        isUrlExterne: true,
      },
      {
        label: "Suivez l'impact de vos trajets quotidiens",
        url: 'coach/suivi-du-jour',
        isUrlExterne: false,
      },
    ]);
  }

  recupererCatalogueServices(utilisateurId: string): Promise<ServiceCatalogue[]> {
    throw Error;
  }
}

describe("Fichier de tests concernant la récupérations des services actifs d'un utilisateur", () => {
  it("En donnant l'id d'utilisateur doit recupérer ses services actifs", async () => {
    // GIVEN
    const utilisateurId = 'id';
    // WHEN
    const usecase = new RecupererServiceActifsUsecase(new ServiceRepositoryMock());
    await usecase.execute(utilisateurId, new ServicePresenterImpl(expectation));

    // THEN
    function expectation(servicesViewModel: ServiceViewModel[]) {
      expect(servicesViewModel).toStrictEqual<ServiceViewModel[]>([
        {
          isUrlExterne: true,
          label: 'Votre conso élec au jour le jour',
          url: 'https://www.enedis.fr/le-compteur-linky-un-outil-pour-la-transition-ecologique',
        },
        {
          isUrlExterne: true,
          label: 'La recette du jour, de saison !',
          url: 'https://cuisine-facile.com/index.php',
        },
        {
          isUrlExterne: false,
          label: "Suivez l'impact de vos trajets quotidiens",
          url: 'coach/suivi-du-jour',
        },
      ]);
    }
  });
});
