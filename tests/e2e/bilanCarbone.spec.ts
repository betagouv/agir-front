import { test, expect, chromium, Page } from '@playwright/test';
import { InjectUtilisateur } from './utils/injectUtilisateur';
import { InjectGamification } from './utils/injectGamification';
import { RouteCoachPath } from '@/router/coach/routes';

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
});

test.describe('Bilan carbone', () => {
  test.describe('quand le bilan carbone est en cours de chargement', async () => {
    test('doit afficher le meta titre associé, le breadcrumb et le loader', async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, async _route => {});
      await page.goto('/bilan-environnemental');

      await expect(page).toHaveTitle("J'agis - Mon bilan environnemental");

      const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
      await expect(breadcrumb).toBeVisible();

      const elementsBreadcrumb = await breadcrumb.getByRole('list').getByRole('listitem').all();
      expect(elementsBreadcrumb).toHaveLength(2);

      const lienAccueil = elementsBreadcrumb[0].getByRole('link', { name: 'Accueil', exact: true });
      await expect(lienAccueil).toBeVisible();
      await expect(lienAccueil).toHaveAttribute('href', RouteCoachPath.COACH);

      const lienCourant = elementsBreadcrumb[1].getByText('Mon bilan environnemental');
      await expect(lienCourant).toBeVisible();
      await expect(lienCourant).toHaveAttribute('aria-current', 'page');

      const loader = page.getByText('Chargement en cours ...', { exact: true });
      await expect(loader).toHaveRole('paragraph');
      await expect(loader).toBeVisible();
    });
  });

  test.describe('quand le bilan carbone a rencontré un problème de chargement', async () => {
    test("doit afficher un message d'erreur", async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateur/dorian/bilans/last`, route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Erreur interne du serveur' }),
        });
      });

      await page.goto('/bilan-environnemental');

      await expect(page).toHaveTitle("J'agis - Mon bilan environnemental");

      const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
      await expect(breadcrumb).toBeVisible();

      const elementsBreadcrumb = await breadcrumb.getByRole('list').getByRole('listitem').all();
      expect(elementsBreadcrumb).toHaveLength(2);

      const lienAccueil = elementsBreadcrumb[0].getByRole('link', { name: 'Accueil', exact: true });
      await expect(lienAccueil).toBeVisible();
      await expect(lienAccueil).toHaveAttribute('href', RouteCoachPath.COACH);

      const lienCourant = elementsBreadcrumb[1].getByText('Mon bilan environnemental');
      await expect(lienCourant).toBeVisible();
      await expect(lienCourant).toHaveAttribute('aria-current', 'page');

      const messageErreur = page.getByText('Problème de chargement des données', { exact: true });
      await expect(messageErreur).toHaveRole('paragraph');
      await expect(messageErreur).toBeVisible();
    });
  });
});
