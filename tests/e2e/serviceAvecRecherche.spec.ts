import { chromium, expect, Page, test } from '@playwright/test';
import { InjectUtilisateur } from './utils/injectUtilisateur';
import { InjectGamification } from './utils/injectGamification';

let page: Page;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('/');

  const injectUtilisateur = new InjectUtilisateur();
  const utilisateurPourLocalStorage = injectUtilisateur.avecUtilisateurPremiereConnexion();

  await page.evaluate(utilisateur => {
    localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
  }, utilisateurPourLocalStorage);

  await page.route(`**/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectGamification().build()),
    });
  });

  await page.route(`**/utilisateurs/dorian/recherche_services/longue_vie_objets/categories`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          code: 'vos_objets',
          label: 'Vos objets',
          is_default: true,
        },
        {
          code: 'donner',
          label: 'Donner',
          is_default: false,
        },
      ]),
    });
  });

  await page.route(`**/utilisateurs/dorian/recherche_services/longue_vie_objets/favoris`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        encore_plus_resultats_dispo: true,
        resultats: [
          {
            id: 'suggestion 1',
            titre: 'Suggestion 1',
            adresse_rue: 'Paris',
            est_favoris: false,
            nombre_favoris: 0,
            categories: ['acheter'],
            latitude: 43.604082000000005,
            longitude: 1.4338050000000002,
            ingredients: [],
            etapes_recette: [],
            categories_labels: ["Acheter d'occasion"],
            sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
          },
          {
            id: 'suggestion 2',
            titre: 'Suggestion 2',
            adresse_rue: 'Paris',
            est_favoris: false,
            nombre_favoris: 0,
            categories: ['acheter'],
            latitude: 43.604082000000005,
            longitude: 1.4338050000000002,
            ingredients: [],
            etapes_recette: [],
            categories_labels: ["Acheter d'occasion"],
            sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
          },
        ],
      }),
    });
  });
});

test.describe('PageServiceLongueVieAuxObjets', () => {
  test('doit permettre la recherche par adresse', async () => {
    await page.goto('/thematique/consommer/service/longue-vie-aux-objets');

    // Simuler une réponse API pour la recherche
    await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultats: [
            {
              id: 'suggestion 2',
              titre: 'Suggestion 2 à Paris',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['acheter'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
          ],
          encore_plus_resultats_dispo: false,
        }),
      });
    });

    const rechercheInput = page.getByRole('combobox', { name: 'Recherche par adresse' });
    await rechercheInput.fill('Paris');
    await page.click('#option-0');
    expect(page.url()).toContain('adresse=Paris,+Paris+(75001)');
    expect(page.url()).toContain('latitude=');
    expect(page.url()).toContain('longitude=');

    await expect(page.getByText('Suggestion 2 à Paris')).toBeVisible();
  });

  test('doit charger plus de résultats', async () => {
    await page.goto('/thematique/consommer/service/longue-vie-aux-objets');

    await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultats: [
            {
              id: 'suggestion 1',
              titre: 'Suggestion 1',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['acheter'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
            {
              id: 'suggestion 2',
              titre: 'Suggestion 2',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['acheter'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
            {
              id: 'suggestion-supp',
              titre: 'Suggestion supplémentaire',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['acheter'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
          ],
          encore_plus_resultats_dispo: true,
        }),
      });
    });

    await page.getByRole('button', { name: 'Voir plus de résultats' }).click();

    expect(page.url()).toContain('nombre=18');

    await expect(page.getByText('Suggestion supplémentaire')).toBeVisible();
  });

  test('doit changer le type de recherche', async () => {
    await page.goto('/thematique/consommer/service/longue-vie-aux-objets');

    await page.selectOption('select[name="categories"]', 'donner');

    expect(page.url()).toContain('type=donner');

    // Simuler une réponse API pour le changement de type
    await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultats: [
            {
              id: 'suggestion 1',
              titre: 'Suggestion 1',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['donner'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
            {
              id: 'suggestion 2',
              titre: 'Suggestion 2',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['donner'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
            {
              id: 'suggestion-supp',
              titre: 'Suggestion donner',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['donner'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
          ],
          encore_plus_resultats_dispo: false,
        }),
      });
    });

    await expect(page.getByText('Suggestion donner')).toBeVisible();
  });

  test('doit cumuler les comportements de recherche, chargement et changement de type', async () => {
    await page.goto('/thematique/consommer/service/longue-vie-aux-objets');

    // Étape 1 : Recherche par adresse
    await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultats: [
            {
              id: 'suggestion 1',
              titre: 'Suggestion 1 à Paris',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['acheter'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
          ],
          encore_plus_resultats_dispo: true,
        }),
      });
    });

    const rechercheInput = page.getByRole('combobox', { name: 'Recherche par adresse' });
    await rechercheInput.fill('Paris');
    await page.click('#option-0');
    await expect(page.getByText('Suggestion 1 à Paris')).toBeVisible();

    // Étape 2 : Chargement de plus de résultats
    await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultats: [
            {
              id: 'suggestion-supp',
              titre: 'Suggestion supplémentaire',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['acheter'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ["Acheter d'occasion"],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
          ],
          encore_plus_resultats_dispo: false,
        }),
      });
    });

    await page.getByRole('button', { name: 'Voir plus de résultats' }).click();
    await expect(page.getByText('Suggestion supplémentaire')).toBeVisible();
    expect(page.url()).toContain('nombre=18');

    // Étape 3 : Changement de type de recherche
    await page.selectOption('select[name="categories"]', 'donner');

    await page.route('**/utilisateurs/dorian/recherche_services/longue_vie_objets/search2', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultats: [
            {
              id: 'suggestion-donner',
              titre: 'Suggestion donner',
              adresse_rue: 'Paris',
              est_favoris: false,
              nombre_favoris: 0,
              categories: ['donner'],
              latitude: 43.604082000000005,
              longitude: 1.4338050000000002,
              ingredients: [],
              etapes_recette: [],
              categories_labels: ['Donner'],
              sources: ['Longue Vie Aux Objets', 'ADEME', 'Communauté Longue Vie Aux Objets'],
            },
          ],
          encore_plus_resultats_dispo: false,
        }),
      });
    });

    await expect(page.getByText('Suggestion donner')).toBeVisible();
    expect(page.url()).toContain('type=donner');
    expect(page.url()).toContain('nombre=9');
    expect(page.url()).toContain('adresse=Paris,+Paris+(75001)');
  });
});

test.afterAll(async () => {
  await page.context().close();
});
