import { RecupererServiceFruitsEtLegumesUsecase } from '@/domaines/serviceRecherche/fruitsEtLegumes/recupererServiceFruitsEtLegumes.usecase';
import {
  ServiceFruitsEtLegumesViewModel,
  ServiceRechercheFruitsEtLegumesPresenterImpl,
} from '@/domaines/serviceRecherche/fruitsEtLegumes/adapters/serviceRechercheFruitsEtLegumes.presenter.impl';
import { ServiceRechercheFruitsEtLegumesRepositoryMock } from './adapters/serviceRechercheFruitsEtLegumes.repository.mock';
import {
  ServiceFruitsEtLegumesDetailWidgetViewModel,
  ServiceRechercheFruitsEtLegumesWidgetPresenterImpl,
} from '@/domaines/serviceRecherche/fruitsEtLegumes/adapters/serviceRechercheFruitsEtLegumesWidget.presenter.impl';

describe('Fichier de tests concernant la récuperation du service Fruits et Légumes', () => {
  it("en donnant l'id d'un utilisateur, renvoie la liste des fruits et légumes du mois triès par odre alphabétique", async () => {
    // GIVEN
    const usecase = new RecupererServiceFruitsEtLegumesUsecase(
      new ServiceRechercheFruitsEtLegumesRepositoryMock({
        listeFruitsEtLegumes: [
          {
            titre: 'Haricot',
            impactCarboneKg: 0.4130619719,
            urlImage: 'urlImage',
            type: 'legume',
          },
          {
            titre: 'Aubergine',
            impactCarboneKg: 0.4571093429,
            urlImage: 'urlImage',
            type: 'legume',
          },
          {
            titre: 'Ananas',
            impactCarboneKg: 1.292282106,
            urlImage: 'urlImage',
            type: 'fruit',
          },
          {
            titre: 'Cerise',
            impactCarboneKg: 1.3353255069,
            urlImage: 'urlImage',
            type: 'fruit',
          },
          {
            titre: 'Mangue',
            impactCarboneKg: 10.641545366,
            urlImage: 'urlImage',
            type: 'fruit',
          },
          {
            titre: 'Tomate',
            impactCarboneKg: 0.581556477,
            urlImage: 'urlImage',
            type: 'fruit_et_legume',
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
    await usecase.execute('idUtilisateur', 'juillet', new ServiceRechercheFruitsEtLegumesPresenterImpl(expectation));

    // THEN
    function expectation(catalogueViewModel: ServiceFruitsEtLegumesViewModel) {
      expect(catalogueViewModel).toStrictEqual<ServiceFruitsEtLegumesViewModel>({
        fruits: {
          peuConsommateurs: [
            {
              nom: 'Tomate',
              urlImage: 'urlImage',
            },
          ],
          moyennementConsommateurs: [
            { nom: 'Ananas', urlImage: 'urlImage' },
            { nom: 'Cerise', urlImage: 'urlImage' },
          ],
          tresConsommateurs: [{ nom: 'Mangue', urlImage: 'urlImage' }],
        },
        legumes: {
          peuConsommateurs: [
            { nom: 'Aubergine', urlImage: 'urlImage' },
            { nom: 'Haricot', urlImage: 'urlImage' },
            {
              nom: 'Tomate',
              urlImage: 'urlImage',
            },
          ],
          moyennementConsommateurs: [],
          tresConsommateurs: [],
        },
        aside: {
          nom: 'Impact CO₂',
          description: 'Des informations fiables et sourcées issues des données environnementales de l’ADEME',
          urlLabel: 'https://impactco2.fr/',
          url: 'https://impactco2.fr/',
          logo: '/logo_impact_co2.svg',
          screenshot: '/service-fruits.webp',
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
  it('Cas de la presentation en Widget doit presenter seulement une liste', async () => {
    // GIVEN
    const usecase = new RecupererServiceFruitsEtLegumesUsecase(
      new ServiceRechercheFruitsEtLegumesRepositoryMock({
        listeFruitsEtLegumes: [
          {
            titre: 'Haricot',
            impactCarboneKg: 0.4130619719,
            urlImage: 'urlImage',
            type: 'legume',
          },
          {
            titre: 'Aubergine',
            impactCarboneKg: 0.4571093429,
            urlImage: 'urlImage',
            type: 'legume',
          },
          {
            titre: 'Ananas',
            impactCarboneKg: 1.292282106,
            urlImage: 'urlImage',
            type: 'fruit',
          },
          {
            titre: 'Cerise',
            impactCarboneKg: 1.3353255069,
            urlImage: 'urlImage',
            type: 'fruit',
          },
          {
            titre: 'Mangue',
            impactCarboneKg: 10.641545366,
            urlImage: 'urlImage',
            type: 'fruit',
          },
          {
            titre: 'Tomate',
            impactCarboneKg: 0.581556477,
            urlImage: 'urlImage',
            type: 'fruit_et_legume',
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
    await usecase.execute(
      'idUtilisateur',
      'juillet',
      new ServiceRechercheFruitsEtLegumesWidgetPresenterImpl(expectation),
    );

    // THEN
    function expectation(catalogueViewModel: ServiceFruitsEtLegumesDetailWidgetViewModel[]) {
      expect(catalogueViewModel).toStrictEqual<ServiceFruitsEtLegumesDetailWidgetViewModel[]>([
        {
          nom: 'Haricot',
          urlImage: 'urlImage',
        },
        {
          nom: 'Aubergine',
          urlImage: 'urlImage',
        },
        {
          nom: 'Ananas',
          urlImage: 'urlImage',
        },
        {
          nom: 'Cerise',
          urlImage: 'urlImage',
        },
        {
          nom: 'Mangue',
          urlImage: 'urlImage',
        },
        {
          nom: 'Tomate',
          urlImage: 'urlImage',
        },
      ]);
    }
  });
});
