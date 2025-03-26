import { chromium, expect, Page, test } from '@playwright/test';
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
  test('doit afficher le meta titre associé, le breadcrumb et un aside explicatif', async () => {
    await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/bilans/last_v3`, async _route => {});
    await page.goto('/bilan-environnemental');

    await expect(page).toHaveTitle("Mon bilan environnemental - J'agis");

    const breadcrumb = page.getByRole('navigation', { name: 'Vous êtes ici :', exact: true });
    await expect(breadcrumb).toBeVisible();

    const elementsBreadcrumb = await breadcrumb.getByRole('list').getByRole('listitem').all();
    expect(elementsBreadcrumb).toHaveLength(2);

    const lienAccueil = elementsBreadcrumb[0].getByRole('link', { name: 'Accueil', exact: true });
    await expect(lienAccueil).toBeVisible();
    await expect(lienAccueil).toHaveAttribute('href', RouteCoachPath.ACCUEIL_CONNECTEE);

    const lienCourant = elementsBreadcrumb[1].getByText('Mon bilan environnemental');
    await expect(lienCourant).toBeVisible();
    await expect(lienCourant).toHaveAttribute('aria-current', 'page');

    const aside = page.getByRole('complementary');
    await expect(
      aside.getByRole('heading', { level: 2, name: 'Proposé par Nos Gestes Climat', exact: true }),
    ).toBeVisible();
  });

  test.describe('quand le bilan carbone est en cours de chargement', async () => {
    test('doit afficher un loader', async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/bilans/last_v3`, async _route => {});

      const loader = page.getByText('Chargement en cours ...', { exact: true });
      await expect(loader).toHaveRole('paragraph');
      await expect(loader).toBeVisible();

      const titrePrincipal = page.getByRole('heading', {
        level: 1,
        name: 'Estimez mon bilan environnemental',
        exact: true,
      });
      await expect(titrePrincipal).not.toBeVisible();
    });
  });

  test.describe('quand le bilan carbone a rencontré un problème de chargement', async () => {
    test("doit afficher un message d'erreur", async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/bilans/last_v3`, route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'Erreur interne du serveur' }),
        });
      });

      await page.goto('/bilan-environnemental');

      const messageErreur = page.getByText('Problème de chargement des données', { exact: true });
      await expect(messageErreur).toHaveRole('paragraph');
      await expect(messageErreur).toBeVisible();

      const titrePrincipal = page.getByRole('heading', {
        level: 1,
        name: 'Estimez mon bilan environnemental',
        exact: true,
      });
      await expect(titrePrincipal).not.toBeVisible();
    });
  });

  test.describe('quand le bilan carbone a fini de charger', async () => {
    test('doit afficher la page correctement', async () => {
      await page.route(`${process.env.VITE_API_URL}/utilisateurs/dorian/bilans/last_v3`, route => {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            pourcentage_completion_totale: 29,
            bilan_approximatif: {
              impact_transport: 'fort',
              impact_alimentation: 'faible',
              impact_logement: 'faible',
              impact_consommation: 'faible',
            },
            liens_bilans_thematique: [
              {
                id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_transport',
                image_url: 'image-transport.svg',
                nombre_total_question: 9,
                pourcentage_progression: 0,
                thematique: 'transport',
                temps_minutes: 5,
              },
              {
                id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_alimentation',
                image_url: 'image-alimentation.svg',
                nombre_total_question: 6,
                pourcentage_progression: 17,
                thematique: 'alimentation',
                temps_minutes: 3,
              },
              {
                id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_consommation',
                image_url: 'image-conso.svg',
                nombre_total_question: 8,
                pourcentage_progression: 75,
                thematique: 'consommation',
                temps_minutes: 10,
              },
              {
                id_enchainement_kyc: 'ENCHAINEMENT_KYC_bilan_logement',
                image_url: 'image-logement.svg',
                nombre_total_question: 8,
                pourcentage_progression: 38,
                thematique: 'logement',
                temps_minutes: 9,
              },
            ],
          }),
        });
      });

      await page.goto('/bilan-environnemental');

      const titrePrincipal = page.getByRole('heading', {
        level: 1,
        name: 'Estimez mon bilan environnemental',
        exact: true,
      });
      await expect(titrePrincipal).toBeVisible();

      const titreBilanPartiel = page.getByRole('heading', { level: 2, name: 'Ma première estimation', exact: true });
      await expect(titreBilanPartiel).toBeVisible();

      const titreAffinerBilan = page.getByRole('heading', { level: 2, name: 'Affinez mon estimation', exact: true });
      await expect(titreAffinerBilan).toBeVisible();

      const titreQuestionsFAQ = page.getByRole('heading', { level: 2, name: 'Une question ?', exact: true });
      await expect(titreQuestionsFAQ).toBeVisible();
    });
  });
});
