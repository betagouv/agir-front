import { RecupererServiceActifsUsecase } from '@/domaines/services/recupererServiceActifs.usecase';
import { MockRecupererServicesActifsRepository } from './adapters/service.recupererServicesActifs.repository.mock';
import { ServicePresenterImpl, ServiceViewModel } from '@/domaines/services/adapters/service.presenter.impl';

describe("Fichier de tests concernant la récupérations des services actifs d'un utilisateur", () => {
  it("En donnant l'id d'utilisateur doit recupérer ses services actifs", async () => {
    // GIVEN
    const utilisateurId = 'id';

    // WHEN
    const usecase = new RecupererServiceActifsUsecase(
      new MockRecupererServicesActifsRepository([
        {
          id: 'enedis',
          titre: 'Votre conso élec au jour le jour',
          contenu: '42 kWh',
          url: 'https://www.enedis.fr/le-compteur-linky-un-outil-pour-la-transition-ecologique',
          isUrlExterne: true,
        },
        {
          id: 'recette',
          titre: 'La recette du jour, de saison !',
          contenu: "La raclette c'est chouette",
          url: 'https://cuisine-facile.com/index.php',
          isUrlExterne: true,
        },
        {
          id: 'suivi',
          titre: "Suivez l'impact de vos trajets quotidiens",
          contenu: 'Faîtes votre suivi du jour',
          url: 'coach/suivi-du-jour',
          isUrlExterne: false,
        },
      ]),
    );
    await usecase.execute(utilisateurId, new ServicePresenterImpl(expectation));

    // THEN
    function expectation(servicesViewModel: ServiceViewModel[]) {
      expect(servicesViewModel).toStrictEqual<ServiceViewModel[]>([
        {
          id: 'enedis',
          contenu: '42 kWh',
          isUrlExterne: true,
          titre: 'Votre conso élec au jour le jour',
          url: 'https://www.enedis.fr/le-compteur-linky-un-outil-pour-la-transition-ecologique',
        },
        {
          id: 'recette',
          contenu: "La raclette c'est chouette",
          isUrlExterne: true,
          titre: 'La recette du jour, de saison !',
          url: 'https://cuisine-facile.com/index.php',
        },
        {
          id: 'suivi',
          contenu: 'Faîtes votre suivi du jour',
          isUrlExterne: false,
          titre: "Suivez l'impact de vos trajets quotidiens",
          url: '/coach/suivi-du-jour',
        },
      ]);
    }
  });
});
