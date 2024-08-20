import { test, expect, Page, Locator, chromium, Route } from '@playwright/test';
import { InjectUtilisateur } from './utils/injectUtilisateur';
import { InjectService } from './utils/injectService';
import { InjectGamification } from './utils/injectGamification';
import { InjectRecommandations } from './utils/injectRecommandations';
import { InjectTodo } from './utils/injectTodo';
import { InjectUnivers } from './utils/injectUnivers';

let page: Page;
test.describe.configure({ mode: 'serial' });
let nombreDePoints = 0;

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

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
    fullFillServiceVierge(route);
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/aides`, route => {
    fullFillServiceVierge(route);
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/events`, route => {
    fullFillServiceVierge(route);
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/logement`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ commune: 'Paris' }),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/recommandations_v2`, route => {
    fullFillRecommandationsVierge(route);
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectGamification().avecPointsTargetInNiveau(50).build()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/profile`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/univers`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectUnivers().vierge()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(
        new InjectTodo().avecTodo({
          numero_todo: 0,
          points_todo: 0,
          titre: 'Première mission !',
          imageUrl: '',
          celebration: {
            type: 'reveal',
            titre: 'Vos recommandations',
            reveal: {
              id: 'idReveal',
              feature: 'recommandations',
              titre: 'Recommandations',
              description: 'Recommandations description lorem ipsum',
            },
          },
          todo: [
            {
              titre: 'Titre de ma mission à faire',
              thematiques: ['logement'],
              type: 'article',
              content_id: 'id',
              service_id: 'serviceId',
              id: 'id',
              points: 10,
              sont_points_en_poche: false,
              progression: {
                current: 0,
                target: 1,
              },
            },
          ],
          done: [
            {
              titre: 'Titre de ma mission terminée',
              thematiques: ['logement'],
              type: 'todoType',
              content_id: 'id1',
              id: 'id1',
              points: 10,
              sont_points_en_poche: false,
              progression: {
                current: 1,
                target: 1,
              },
            },
          ],
          is_last: false,
        }),
      ),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/defis`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/defis_v2`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });
});

test.describe('Mission 1', async () => {
  test('Affichage des missions', async () => {
    await page.goto('/agir');

    await expect(page.getByRole('heading', { level: 1, name: 'Bonjour' })).toBeVisible();

    // const titrePrincipalMission = page.getByRole('heading', { level: 2, name: 'Première mission !' });
    // await expect(titrePrincipalMission).toBeVisible();

    // const titreEtatMissionDone = page.getByRole('heading', { level: 3, name: 'déjà fait' });
    // await expect(titreEtatMissionDone).toBeVisible();

    // const titreMission1 = page.getByRole('heading', { level: 4, name: 'Titre de ma mission terminée' });
    // const lienMission1 = page.getByRole('link', { name: 'Titre de ma mission terminée' });
    // await expect(titreMission1).toBeVisible();
    // await expect(lienMission1).not.toBeVisible();

    // const titreEtatMissionEnCours = page.getByRole('heading', { level: 3, name: 'à faire' });
    // await expect(titreEtatMissionEnCours).toBeVisible();

    // const titreMission2 = page.getByRole('heading', { level: 4, name: 'Titre de ma mission à faire' });
    // const lienMission2 = page.getByRole('link', { name: 'Titre de ma mission à faire' });
    // await expect(titreMission2).toBeVisible();
    // await expect(lienMission2).toBeVisible();
  });

  test('Objectif 1 - récolter ses premiers points', async () => {
    const scoreInitial = parseInt(await page.innerText('.tag__progression--score'));
    await expect(scoreInitial).toEqual(0);

    const boutonRecolter = page.getByRole('button', { name: 'Récolter vos 10 points' });

    await expect(boutonRecolter).toBeVisible();

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo/id1/gagner_points`, route => {
      postfullFillGagnerPointReponseOk(route, 'id1');
    });

    nombreDePoints = nombreDePoints + 10;
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          new InjectGamification()
            .avecPointsTargetInNiveau(50)
            .avecCurrentPointsInNiveau(nombreDePoints)
            .avecPoints(nombreDePoints)
            .build(),
        ),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          new InjectTodo().avecTodo({
            numero_todo: 0,
            points_todo: 0,
            titre: 'Première mission !',
            imageUrl: '',
            celebration: {
              type: 'reveal',
              titre: 'Vos recommandations',
              reveal: {
                id: 'idReveal',
                feature: 'recommandations',
                titre: 'Recommandations',
                description: 'Recommandations description lorem ipsum',
              },
            },
            todo: [
              {
                titre: 'Titre de ma mission à faire',
                thematiques: ['logement'],
                type: 'article',
                content_id: '111',
                service_id: 'serviceId',
                id: 'id',
                points: 10,
                sont_points_en_poche: false,
                progression: {
                  current: 0,
                  target: 1,
                },
              },
            ],
            done: [
              {
                titre: 'Titre de ma mission terminée',
                thematiques: ['logement'],
                type: 'todoType',
                content_id: 'id1',
                id: 'id1',
                points: 10,
                sont_points_en_poche: true,
                progression: {
                  current: 1,
                  target: 1,
                },
              },
            ],
            is_last: false,
          }),
        ),
      });
    });

    await boutonRecolter.click({ force: true });
    await page.waitForTimeout(500);

    const scoreFinal = parseInt(await page.innerText('.tag__progression--score'));
    await expect(scoreFinal).toEqual(10);
  });

  test('Objectif 2 - premier article', async () => {
    await page.route(`**/api/articles/*`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            id: 111,
            attributes: {
              titre: "Qu'est-ce que les légumineuses ?",
              sousTitre: 'Découvrez leur impact positif sur la santé et l’environnement',
              contenu:
                '<p>Les légumineuses sont des plantes qui produisent des graines comestibles. <strong>Elles sont excellentes pour la santé car elles sont riches en protéines et en fibres, tout en concentrant très peu de matières grasses.</strong></p><p>Elles peuvent donc remplacer la viande plusieurs fois par semaine tout en vous apportant les nutriments nécessaires. D’autant plus que leur culture demande peu d’eau, n’exige pas d’apport d’engrais, peut se faire en France et affiche un excellent bilan carbone.</p><p>La production de viande, à l’inverse, est responsable d’1/7 des émissions mondiales de gaz à effet de serre, tout en contribuant de façon excessive à la déforestation et aux pollutions de l’environnement.</p><p>Les légumineuses sont présentes dans de nombreux plats français (saucisses-lentilles, cassoulet) et internationaux (couscous, chili con carne, dahl de lentilles…). Leur intérêt est aussi de pouvoir conserver très longtemps une source de protéines végétales dans son placard !</p><h3>Découvrez toutes les variétés de légumineuses :</h3><ul><li><p>lentilles</p></li><li><p>petits pois</p></li><li><p>pois cassés</p></li><li><p>fèves</p></li><li><p>haricots : cocos, roses, noirs, rouges, blancs</p></li><li><p>pois chiches</p></li><li><p>soja</p></li></ul><p>Ça vous donne envie de partir à la découverte de nouvelles saveurs ? Découvrez une recette simple de burger végétarien à base de pois chiches <a target="_self" rel="" href="/article/recettes-legumineuses/16"><strong>en cliquant ici.</strong></a></p>',
              source: null,
              codes_postaux: null,
              duree: '⏱️ 3 minutes',
              frequence: null,
              points: 5,
              difficulty: 1,
              createdAt: '2023-11-30T15:56:04.997Z',
              updatedAt: '2023-12-21T11:28:19.070Z',
              publishedAt: '2023-12-05T20:41:49.538Z',
              partenaire: {
                data: {
                  id: 1,
                  attributes: {
                    nom: 'ADEME',
                    lien: 'https://agirpourlatransition.ademe.fr/particuliers/',
                    createdAt: '2023-09-14T11:13:54.062Z',
                    updatedAt: '2023-12-07T11:09:35.796Z',
                    publishedAt: '2023-09-14T11:13:57.352Z',
                    logo: {
                      data: [
                        {
                          id: 59,
                          attributes: {
                            name: 'Logo-Ademe-2020.jpg',
                            alternativeText: null,
                            caption: null,
                            width: 952,
                            height: 1086,
                            formats: {
                              large: {
                                ext: '.jpg',
                                url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1701947358/large_Logo_Ademe_2020_c234624ba3.jpg',
                                hash: 'large_Logo_Ademe_2020_c234624ba3',
                                mime: 'image/jpeg',
                                name: 'large_Logo-Ademe-2020.jpg',
                                path: null,
                                size: 57.44,
                                width: 877,
                                height: 1000,
                                provider_metadata: {
                                  public_id: 'large_Logo_Ademe_2020_c234624ba3',
                                  resource_type: 'image',
                                },
                              },
                              small: {
                                ext: '.jpg',
                                url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1701947358/small_Logo_Ademe_2020_c234624ba3.jpg',
                                hash: 'small_Logo_Ademe_2020_c234624ba3',
                                mime: 'image/jpeg',
                                name: 'small_Logo-Ademe-2020.jpg',
                                path: null,
                                size: 24.62,
                                width: 438,
                                height: 500,
                                provider_metadata: {
                                  public_id: 'small_Logo_Ademe_2020_c234624ba3',
                                  resource_type: 'image',
                                },
                              },
                              medium: {
                                ext: '.jpg',
                                url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1701947358/medium_Logo_Ademe_2020_c234624ba3.jpg',
                                hash: 'medium_Logo_Ademe_2020_c234624ba3',
                                mime: 'image/jpeg',
                                name: 'medium_Logo-Ademe-2020.jpg',
                                path: null,
                                size: 41.02,
                                width: 657,
                                height: 750,
                                provider_metadata: {
                                  public_id: 'medium_Logo_Ademe_2020_c234624ba3',
                                  resource_type: 'image',
                                },
                              },
                              thumbnail: {
                                ext: '.jpg',
                                url: 'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1701947358/Logo_Ademe_2020_c234624ba3.jpg',
                                hash: 'Logo_Ademe_2020_c234624ba3',
                                mime: 'image/jpeg',
                                name: 'Logo-Ademe-2020.jpg',
                                path: null,
                                provider_metadata: {
                                  public_id: 'Logo_Ademe_2020_c234624ba3',
                                  resource_type: 'image',
                                },
                              },
                            },
                            hash: 'Logo_Ademe_2020_c234624ba3',
                            ext: '.jpg',
                            mime: 'image/jpeg',
                            size: 55.75,
                            url: 'https://res.cloudinary.com/dq023imd8/image/upload/v1701947358/Logo_Ademe_2020_c234624ba3.jpg',
                            previewUrl: null,
                            provider: 'cloudinary',
                            provider_metadata: { public_id: 'Logo_Ademe_2020_c234624ba3', resource_type: 'image' },
                            createdAt: '2023-12-07T11:09:19.656Z',
                            updatedAt: '2023-12-07T11:09:19.656Z',
                          },
                        },
                      ],
                    },
                  },
                },
              },
              sources: [],
            },
          },
          meta: {},
        }),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
      fullFillServiceVierge(route);
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(new InjectGamification().build()),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/events`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: 'Ok',
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/bibliotheque/articles/111`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          content_id: '17',
          type: 'article',
          titre: "Qu'est-ce que les légumineuses ?",
          soustitre: 'Découvrez leur impact positif sur la santé et l’environnement',
          thematique_principale: 'alimentation',
          thematique_principale_label: '🥦 Alimentation',
          thematiques: ['alimentation'],
          image_url:
            'https://res.cloudinary.com/dq023imd8/image/upload/t_media_lib_thumb/v1701356429/suheyl_burak_BJ_Xi_Srr_Cv_A8_unsplash_5540d2d276.jpg',
          points: 5,
          favoris: false,
          read_date: '2024-04-12T08:42:24.004Z',
        }),
      });
    });

    const missionAFaire = await page.getByRole('link', { name: 'Titre de ma mission à faire' });
    await missionAFaire.click({ force: true });

    const titre = await page.getByRole('heading', { name: "Qu'est-ce que les légumineuses ?" });
    await expect(titre).toBeVisible();
  });

  test("Objectif 3 - Revenir à l'accueil", async () => {
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
      fullFillServiceVierge(route);
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(new InjectGamification().build()),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/recommandations`, route => {
      fullFillRecommandationsVierge(route);
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/profile`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          new InjectTodo().avecTodo({
            numero_todo: 0,
            points_todo: 0,
            titre: 'Première mission !',
            imageUrl: '',
            celebration: {
              type: 'reveal',
              titre: 'Vos recommandations',
              reveal: {
                id: 'idReveal',
                feature: 'recommandations',
                titre: 'Recommandations',
                description: 'Recommandations description lorem ipsum',
              },
            },
            todo: [],
            done: [
              {
                titre: 'Titre de ma mission terminée',
                thematiques: ['logement'],
                type: 'todoType',
                content_id: 'id1',
                id: 'id1',
                points: 10,
                sont_points_en_poche: true,
                progression: {
                  current: 1,
                  target: 1,
                },
              },
              {
                titre: 'Titre de ma mission à faire',
                thematiques: ['logement'],
                type: 'article',
                content_id: 'id',
                id: 'id',
                points: 20,
                sont_points_en_poche: false,
                progression: {
                  current: 1,
                  target: 1,
                },
              },
            ],
            is_last: false,
          }),
        ),
      });
    });

    const boutonRetour = await page.getByText("Revenir à l'accueil");
    await expect(boutonRetour).toBeVisible();

    await boutonRetour.click({ force: true });
  });

  test('Objectif 4 - Finir la mission', async () => {
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo/id/gagner_points`, route => {
      postfullFillGagnerPointReponseOk(route, 'id');
    });

    nombreDePoints = nombreDePoints + 20;
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          new InjectGamification()
            .avecPointsTargetInNiveau(50)
            .avecCurrentPointsInNiveau(nombreDePoints)
            .avecPoints(nombreDePoints)
            .build(),
        ),
      });
    });

    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          new InjectTodo().avecTodo({
            numero_todo: 0,
            points_todo: 0,
            titre: 'Première mission !',
            imageUrl: '',
            celebration: {
              type: 'reveal',
              titre: 'Vos recommandations',
              reveal: {
                id: 'idReveal',
                feature: 'recommandations',
                titre: 'Recommandations',
                description: 'Recommandations description lorem ipsum',
              },
            },
            todo: [],
            done: [
              {
                titre: 'Titre de ma mission terminée',
                thematiques: ['logement'],
                type: 'todoType',
                content_id: 'id1',
                id: 'id1',
                points: 10,
                sont_points_en_poche: true,
                progression: {
                  current: 1,
                  target: 1,
                },
              },
              {
                titre: 'Titre de ma mission à faire',
                thematiques: ['logement'],
                type: 'article',
                content_id: '111',
                id: 'id',
                points: 10,
                sont_points_en_poche: true,
                progression: {
                  current: 0,
                  target: 1,
                },
              },
            ],
            is_last: false,
          }),
        ),
      });
    });

    const boutonRecolter = await page.getByRole('button', { name: 'Récolter vos 20 points' });
    await boutonRecolter.click({ force: true });

    const boutonRecolterBonus = await page.getByRole('button', { name: 'Découvrir le bonus' });
    await expect(boutonRecolterBonus).toBeVisible();

    await boutonRecolterBonus.click({ force: true });

    const texteFelicitation = await page.getByText('Vous avez accompli la Première mission !');
    await expect(texteFelicitation).toBeVisible();
  });
});

const fullFillServiceVierge = (route: Route) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(new InjectService().vierge()),
  });
};

const fullFillRecommandationsVierge = (route: Route) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(new InjectRecommandations().vierge()),
  });
};

const postfullFillGagnerPointReponseOk = (route: Route, id: string) => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: 'Ok',
  });
};
