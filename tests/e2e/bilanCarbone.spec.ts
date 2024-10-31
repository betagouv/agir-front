import { test, expect, chromium, Page } from '@playwright/test';
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

  await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/gamification`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(new InjectGamification().avecPointsTargetInNiveau(50).avecPoints(50).build()),
    });
  });

  await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });
});

test.describe('bilan carbone', () => {
  test("doit afficher le bon fil d'ariane et meta-titre", async () => {
    await page.goto('/bilan-environnemental');

    await expect(page).toHaveTitle("J'agis - Mon bilan environnemental");

    const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
    await expect(breadcrumb).toBeVisible();
  });
});
