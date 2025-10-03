import { chromium, expect, Page, test } from '@playwright/test';
import { InjectService } from './utils/injectService';
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

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/services`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectService().avecServices([])),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectGamification().build()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/questionsKYC_v2/KYC001`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        code: 'KYC_preference',
        question: 'Sur quels thèmes recherchez-vous en priorité des aides et conseils ?',
        reponse_multiple: [
          {
            code: 'alimentation',
            label: 'La cuisine et l’alimentation',
            selected: false,
          },
          {
            code: 'transport',
            label: 'Mes déplacements',
            selected: false,
          },
          {
            code: 'logement',
            label: 'Mon logement',
            selected: false,
          },
          {
            code: 'consommation',
            label: 'Ma consommation',
            selected: false,
          },
          {
            code: 'ne_sais_pas',
            label: 'Je ne sais pas encore',
            selected: false,
          },
        ],
        is_answered: true,
        categorie: 'recommandation',
        points: 0,
        type: 'choix_multiple',
        is_NGC: false,
        thematique: 'climat',
      }),
    });
  });
});

test.describe('kyc', () => {
  test('doit afficher le bon title et titre', async () => {
    await page.goto('/compte/mieux-vous-connaitre/KYC001');

    await expect(page).toHaveTitle("Mieux vous connaître - J'agis");
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Question pour mieux vous connaître');
  });

  test('doit afficher le remerciement', async () => {
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/questionsKYC_v2/KYC_preference`, route => {
      route.fulfill({
        status: 201,
      });
    });

    await page.getByRole('checkbox', { name: 'La cuisine et l’alimentation' }).check({ force: true });
    await page.getByRole('button', { name: 'Valider' }).click({ force: true });

    expect(await page.getByText('Merci pour votre réponse !')).toBeDefined();
  });
});
