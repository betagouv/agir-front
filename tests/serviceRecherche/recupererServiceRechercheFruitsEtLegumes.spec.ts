import { RecupererServiceFruitsEtLegumesUsecase } from '@/domaines/serviceRecherche/recupererServiceFruitsEtLegumes.usecase';
import {
  ServiceFruitsEtLegumesViewModel,
  ServiceRechercheFruitsEtLegumesPresenterImpl,
} from '@/domaines/serviceRecherche/adapters/serviceRechercheFruitsEtLegumes.presenter.impl';
import { ServiceRechercheFruitsEtLegumesRepositoryMock } from './adapters/serviceRechercheFruitsEtLegumes.repository.mock';

describe('Fichier de tests concernant la récuperation du service Fruits et Légumes', () => {
  it("en donnant l'id d'un utilisateur, renvoie la liste des fruits et légumes du mois triès", () => {
    // GIVEN
    const usecase = new RecupererServiceFruitsEtLegumesUsecase(
      new ServiceRechercheFruitsEtLegumesRepositoryMock({
        listeFruitsEtLegumes: [
          {
            titre: 'Haricot',
            impactCarboneKg: 0.4130619719,
          },
          {
            titre: 'Aubergine',
            impactCarboneKg: 0.4571093429,
          },
          {
            titre: 'Ananas',
            impactCarboneKg: 1.292282106,
          },
          {
            titre: 'Cerise',
            impactCarboneKg: 1.3353255069,
          },
          {
            titre: 'Mangue',
            impactCarboneKg: 10.641545366,
          },
        ],
        categories: [
          {
            code: 'mai',
            label: 'mai',
            estLaCategorieParDefaut: false,
          },
          {
            code: 'juin',
            label: 'juin',
            estLaCategorieParDefaut: false,
          },
          {
            code: 'juillet',
            label: 'juillet',
            estLaCategorieParDefaut: true,
          },
        ],
      }),
    );

    // WHEN
    usecase.execute('idUtilisateur', 'juillet', new ServiceRechercheFruitsEtLegumesPresenterImpl(expectation));

    // THEN
    function expectation(catalogueViewModel: ServiceFruitsEtLegumesViewModel) {
      expect(catalogueViewModel).toStrictEqual<ServiceFruitsEtLegumesViewModel>({
        peuConsommateurs: ['Haricot', 'Aubergine'],
        moyennementConsommateurs: ['Ananas', 'Cerise'],
        tresConsommateurs: ['Mangue'],
        aside: {
          nom: 'Impact CO₂',
          description: 'Des informations fiables et sourcées issues des données environnementales de l’ADEME',
          url: 'https://impactco2.fr/',
          logo: '',
          screenshot: '',
        },
        categories: [
          {
            code: 'mai',
            label: 'mai',
            estLaCategorieParDefaut: false,
          },
          {
            code: 'juin',
            label: 'juin',
            estLaCategorieParDefaut: false,
          },
          {
            code: 'juillet',
            label: 'juillet',
            estLaCategorieParDefaut: true,
          },
        ],
      });
    }
  });
});
