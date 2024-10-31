import { test, expect, chromium, Page } from '@playwright/test';
import { InjectUtilisateur } from './utils/injectUtilisateur';
import { InjectGamification } from './utils/injectGamification';
import { getByText } from '@testing-library/vue';

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

  await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, async _route => {});
});

test.describe('Bilan carbone', () => {
  test.describe('quand le bilan carbone est en cours de chargement', async () => {
    test('doit afficher le meta titre associé, le breadcrumb et le loader', async () => {
      await page.goto('/bilan-environnemental');

      await expect(page).toHaveTitle("J'agis - Mon bilan environnemental");

      const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
      await expect(breadcrumb).toBeVisible();

      const nombreElementsBreadcrumb = await breadcrumb.getByRole('list').getByRole('listitem').count();
      const premierElementDuBreadcrumb = breadcrumb.getByRole('list').getByRole('listitem').first();
      const lienAccueil = premierElementDuBreadcrumb.getByRole('link', { name: 'Accueil', exact: true });
      expect(nombreElementsBreadcrumb).toEqual(2);
      await expect(lienAccueil).toBeVisible();

      const loader = page.getByText('Chargement en cours ...', { exact: true });
      await expect(loader).toBeVisible();
    });
  });
});
