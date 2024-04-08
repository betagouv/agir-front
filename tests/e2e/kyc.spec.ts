import { test, expect, chromium, Page } from '@playwright/test';

let page: Page;

test.beforeAll(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto('/');

  await page.evaluate(() => {
    localStorage.setItem(
      'utilisateur',
      JSON.stringify({
        utilisateur: {
          id: 'dorian',
          nom: 'RECETTEUR',
          codePostal: '21000',
          commune: 'DIJON',
          prenom: 'Dorian',
          mail: 'dorian@agir.dev',
          revenuFiscal: null,
          nombreDePartsFiscales: 2.5,
          fonctionnalitesDebloquees: ['aides', 'services', 'recommandations', 'bibliotheque'],
        },
        valeurBilanCarbone: { bilan: '', details: [], valeurMax: 0 },
        score: {
          points: 470,
          niveau: 5,
          nombreDePointsDansLeNiveau: 70,
          nombreDePointsDuNiveau: 200,
          celebration: null,
          afficherMissionsTermines: false,
        },
      }),
    );
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        points: 10,
        niveau: 1,
        current_points_in_niveau: 10,
        point_target_in_niveau: 100,
        celebrations: [],
      }),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/recommandations`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/recommandations`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/todo`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        numero_todo: 2,
        points_todo: 0,
        titre: 'Plus de mission, pour le moment...',
        todo: [],
        done: [],
        is_last: true,
      }),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/questionsKYC/KYC001`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'KYC001',
        question: 'Sur quel(s) sujet(s) souhaitez-vous en savoir plus pour réduire votre impact environnemental ?',
        reponse: ['🥦 Alimentation'],
        categorie: 'mission',
        points: 5,
        type: 'choix_multiple',
        reponses_possibles: [
          '🥦 Alimentation',
          '☀️ Climat et Environnement',
          '🛒 Consommation durable',
          '🗑️ Déchets',
          '🏡 Logement',
          '⚽ Loisirs (vacances, sport,...)',
          '🚗 Transports',
          'Aucun / Je ne sais pas',
        ],
        is_NGC: false,
      }),
    });
  });
});

test.describe('kyc', () => {
  test('doit afficher le bon title et titre', async () => {
    await expect(page).toHaveTitle('Agir ! - Agir');
    await page.goto('/mieux-vous-connaitre/KYC001');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
    await page.getByRole('checkbox', { name: '🥦 Alimentation' }).check();
  });

  test('doit afficher le remerciement', async () => {
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/questionsKYC/KYC001`, route => {
      route.fulfill({
        status: 201,
      });
    });

    await page.getByRole('checkbox', { name: '🥦 Alimentation' }).check();

    await page.getByRole('button', { name: 'Valider' }).click();

    expect(await page.getByText('Merci pour votre réponse !!!')).toBeDefined();

    await page.getByRole('link', { name: 'Continuer' }).click();
    await expect(page).toHaveTitle('Agir ! - Agir');
  });
});
